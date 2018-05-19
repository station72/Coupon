using System.Threading.Tasks;
using AutoMapper;
using Coupon.Common;
using Coupon.Data;
using Coupon.Data.Model;
using Coupon.Dto;
using Coupon.Forms;
using Microsoft.EntityFrameworkCore;

namespace Coupon.Services
{
    public class ProductsService : IProductsService
    {
        private readonly CouponDbContext _couponDbContext;
        private readonly IMapper _mapper;

        public ProductsService(
            CouponDbContext couponDbContext,
            IMapper mapper)
        {
            _couponDbContext = couponDbContext;
            _mapper = mapper;
        }

        public async Task<ProductDto> CreateAsync(ProductCreateForm form)
        {
            var productForCreation = new Products
            {
                Title = form.Title
            };

            var result =  _couponDbContext.Products.Add(productForCreation);
            await _couponDbContext.SaveChangesAsync();

            var mapperdProduct = _mapper.Map<ProductDto>(result.Entity);
            return mapperdProduct;
        }

        public async Task<ProductDto> GetAsync(int id)
        {
            throw new System.NotImplementedException("Hello!");
            var product = await _couponDbContext.Products
                .FirstOrDefaultAsync(u=>u.Id == id);

            if (product == null)
                throw new NotFoundException();

            return _mapper.Map<ProductDto>(product);
        }

        public async Task<ProductDto> UpdateAsync(int id, ProductUpdateForm form)
        {
            var product = await _couponDbContext.Products
                .FirstOrDefaultAsync(u => u.Id == id);

            if (product == null)
                throw new NotFoundException();

            product.Title = form.Title;
            await _couponDbContext.SaveChangesAsync();

            return _mapper.Map<ProductDto>(product);
        }
    }
}
