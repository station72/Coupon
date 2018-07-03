using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Coupon.Common;
using Coupon.Common.Constants;
using Coupon.Data;
using Coupon.Data.Model;
using Coupon.Dto;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using SkiaSharp;

namespace Coupon.Services
{
    public class ContentService : IContentService
    {
        //TODO: ensure creating folders
        private readonly string _content = "content";

        private readonly IHostingEnvironment _hostEnvironment;
        private readonly CouponDbContext _db;
        private readonly IMapper _map;

        public ContentService(
            IHostingEnvironment hostEnvironment,
            CouponDbContext db,
            IMapper map
            )
        {
            _hostEnvironment = hostEnvironment;
            _db = db;
            _map = map;
        }

        public async Task<ImageDto> UploadImageAsync(IFormFile fileForm, string host)
        {
            var original = await CheckAndSaveOriginalAsync(fileForm.OpenReadStream(), fileForm.FileName);

            var fileName = Path.GetFileName(original.SourcePath);
            //ResizeImagesAndSave(original.SourcePath, fileName);

            var image = _db.Images.Add(new Images
            {
                //OriginalWidth = original.Width,
                //OriginalHeight = original.Height,
                //CreationDate = DateTimeOffset.UtcNow,
                //SmallPath = $"{host}/{_content}/{ImageConstants.RootImageDirectory}/{ImageConstants.Image300X300}/{fileName}",
                //MiddlePath = $"{host}/{_content}/{ImageConstants.RootImageDirectory}/{ImageConstants.Image600X600}/{fileName}",
                //LargePath = $"{host}/{_content}/{ImageConstants.RootImageDirectory}/{ImageConstants.Image900X900}/{fileName}",
                OriginalPath = $"{host}/{ImageConstants.RootImageDirectory}/{ImageConstants.OriginalDirectory}/{fileName}",
            });

            await _db.SaveChangesAsync();
            return _map.Map<ImageDto>(image.Entity);
        }

        //public void ResizeImagesAndSave(string sourcePath, string fileName)
        //{
        //    foreach (var format in ImageConstants.ImageSettings)
        //    {
        //        var destPath = Path.Combine(_hostEnvironment.ContentRootPath, _content, ImageConstants.RootImageDirectory, format.Value, fileName);
        //        ImageBuilder.Current.Build(new ImageJob(sourcePath, destPath, new Instructions(format.Key) { AutoRotate = true }));
        //    }
        //}

        private async Task<SaveOriginalImageDto> CheckAndSaveOriginalAsync(Stream source, string fileName)
        {
            var extension = Path.GetExtension(fileName).ToLower();
            if (!ImageConstants.Extensions.Contains(extension))
                throw new CouponException("Не поддерживаемый тип файла. Используйте файлы " + ImageConstants.Extensions.Aggregate((prev, current) => { return prev + ", " + current; }));

            var destinationPath = GenerateOriginalDestinationPath(extension);
            var originalDto = new SaveOriginalImageDto { SourcePath = destinationPath };

            try
            {
                using (var inputStream = new SKManagedStream(source))
                {
                    using (var original = SKBitmap.Decode(inputStream))
                    {
                        originalDto.Width = original.Width;
                        originalDto.Height = original.Height;

                        source.Seek(0, SeekOrigin.Begin);
                    }
                }
            }
            catch (Exception ex)
            {
                //TODO: add logger
                //_logger.Exception(ex);
                throw new CouponException("Не удалось прочитать изображение");
            }

            var saveOrg = await TrySaveOriginalAsync(source, destinationPath);
            if (!saveOrg)
                throw new CouponException("Не удалось прочитать данные");

            return originalDto;
        }

        private string GenerateOriginalDestinationPath(string extension)
        {
            var newFileName = Guid.NewGuid().ToString("N") + extension;
            var sourcePath = Path.Combine(
                _hostEnvironment.ContentRootPath,
                _content,
                ImageConstants.RootImageDirectory,
                ImageConstants.OriginalDirectory,
                newFileName);

            return sourcePath;
        }

        private async Task<bool> TrySaveOriginalAsync(Stream source, string destPath)
        {
            var destination = File.OpenWrite(destPath);
            try
            {
                source.Seek(0, SeekOrigin.Begin);
                await source.CopyToAsync(destination);

                return true;
            }
            catch (Exception ex)
            {
                //_logger.Error(ex.Message, ex);
                return false;
            }
            finally
            {
                destination.Close();
            }
        }
    }

    public class SaveOriginalImageDto
    {
        public string SourcePath { get; internal set; }
        public int Width { get; internal set; }
        public int Height { get; internal set; }
    }
}
