using AutoMapper;
using Coupon.Common;
using Coupon.Common.Enums;
using Coupon.DAL;
using Coupon.Data;
using Coupon.Data.Model;
using Coupon.Dto;
using Coupon.Forms.Common;
using Coupon.Forms.Product;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Coupon.Services
{
    public class ProductsService : IProductsService
    {
        private readonly IProductsRepository _productsRepository;
        private readonly IMapper _mapper;
        private readonly IImagesService _imagesService;
        private readonly CouponDbContext _db;

        public ProductsService(
            IProductsRepository productsRepository,
            IImagesService imagesService,
            IMapper mapper,
            CouponDbContext db
            )
        {
            _productsRepository = productsRepository;
            _imagesService = imagesService;
            _mapper = mapper;
            _db = db;
        }

        public async Task<ProductDto> CreateAsProviderAsync(int userId, int providerId, ProductCreateForm form)
        {
            var image = await _imagesService.SaveImageAsync(form.MainImage);
            var productForCreation = new Products
            {
                Title = form.Title,
                Conditions = form.Conditions,
                FullTitle = form.FullTitle,
                Description = form.Description,
                ValidFrom = form.ValidFrom.Value,
                ValidUntil = form.ValidUntil.Value,
                State = ProductState.New,
                MainImageId = image.Id,
                OldPrice = form.OldPrice.Value,
                NewPrice = form.NewPrice.Value,
                OnSale = false,
                StartAvailableCount = form.StartAvailableCount,
                ProviderId = providerId
            };

            var newProduct = _db.Products.Add(productForCreation);
            await _db.SaveChangesAsync();

            var mappedProduct = _mapper.Map<ProductDto>(newProduct.Entity);
            return mappedProduct;
        }

        public async Task DeleteAsync(int id)
        {
            var product = await _productsRepository.Get(id);
            if (product == null)
                throw new NotFoundException();

            _productsRepository.Delete(product);
            await _productsRepository.Save();
        }

        public async Task<ProductDto> GetAsync(int id)
        {
            var product = await _productsRepository.Get(id);

            if (product == null)
                throw new NotFoundException();

            return _mapper.Map<ProductDto>(product);
        }

        public async Task<IEnumerable<ProductDto>> GetListAsync(PagingForm pagingForm)
        {
            var products = await _productsRepository.GetListAsync(pagingForm);
            return products.Select(_mapper.Map<ProductDto>);
        }

        public Task<int> GetTotalCount(PagingForm form)
        {
            return _db.Products
                .Where(u => !u.IsDeleted)
                .CountAsync();
        }

        public async Task<ProductDto> UpdateAsync(int id, ProductUpdateForm form)
        {
            var product = await _productsRepository.Get(id);

            if (product == null)
                throw new NotFoundException();

            product.Title = form.Title;
            await _productsRepository.Save();

            return _mapper.Map<ProductDto>(product);
        }
    }
}