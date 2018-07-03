using System;
using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using Coupon.Data;
using Coupon.Data.Model;
using Coupon.Dto;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace Coupon.Services
{
    public class ImagesService : IImagesService
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly CouponDbContext _db;
        private readonly IMapper _map;

        //private string projectRootFolder;
        public ImagesService(
            IHostingEnvironment env,
            CouponDbContext db,
            IMapper map
            )
        {
            _db = db;
            _map = map;
            _hostingEnvironment = env;

            //projectRootFolder = env.ContentRootPath.Substring(0,
            //    env.ContentRootPath.LastIndexOf(@"\ProjectRoot\", StringComparison.Ordinal) + @"\ProjectRoot\".Length);
        }

        public async Task<ImageDto> SaveImageAsync(IFormFile mainImage)
        {
            var basePath = _hostingEnvironment.ContentRootPath;
            var extension = Path.GetExtension(mainImage.FileName);
            var newName = Path.ChangeExtension(Guid.NewGuid().ToString(), extension);
            var fullPath = Path.Combine(basePath, newName);

            var fileStream =  new FileStream(fullPath, FileMode.CreateNew);
            await mainImage.CopyToAsync(fileStream);

            var image = _db.Images.Add(new Images
            {
                Id = Guid.NewGuid(),
                OriginalPath = newName
            });

            await _db.SaveChangesAsync();

            return _map.Map<ImageDto>(image.Entity);
        }
    }
}
