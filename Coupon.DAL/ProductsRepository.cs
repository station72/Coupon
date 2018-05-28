using Coupon.Data;
using Coupon.Data.Cache;
using Coupon.Data.Model;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Coupon.DAL
{
    public class ProductsRepository : IProductsRepository
    {
        private readonly CouponDbContext _couponDbContext;
        private readonly IProductsCache _productCache;

        public ProductsRepository(
            CouponDbContext couponDbContext,
            IProductsCache productCache
            )
        {
            _productCache = productCache;
            _couponDbContext = couponDbContext;
        }

        public async Task<Products> Add(Products product)
        {
            var added = _couponDbContext.Products.Add(product);
            await _couponDbContext.SaveChangesAsync();

            await _productCache.AddOrUpdateAsync(product);

            return added.Entity;
        }

        public void Delete(Products product)
        {
            product.IsDeleted = true;
        }

        public async Task<Products> Get(int id)
        {
            var cacheResult = await _productCache.GetAsync(id);
            if (cacheResult.Succeded)
            {
                return cacheResult.Value;
            }

            var product = await _couponDbContext.Products
                .FirstOrDefaultAsync(u => u.Id == id && !u.IsDeleted);

            return product;
        }

        public Task<int> Save()
        {
            return _couponDbContext.SaveChangesAsync();
        }
    }
}
