using Coupon.Data;
using Coupon.Data.Cache;
using Coupon.Data.Model;
using Coupon.Forms.Common;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Coupon.DAL
{
    public class ProductsRepository : IProductsRepository
    {
        private readonly CouponDbContext _db;
        private readonly IProductsCache _productCache;

        public ProductsRepository(
            CouponDbContext couponDbContext,
            IProductsCache productCache
            )
        {
            _productCache = productCache;
            _db = couponDbContext;
        }

        public async Task<Products> Add(Products product)
        {
            var added = _db.Products.Add(product);
            await _db.SaveChangesAsync();

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

            var product = await _db.Products
                .FirstOrDefaultAsync(u => u.Id == id && !u.IsDeleted);

            return product;
        }

        public async Task<IEnumerable<Products>> GetListAsync(PagingForm pagingForm)
        {
            var result = await _db.Products
                .AsNoTracking()
                .Where(u => !u.IsDeleted)
                .Skip(pagingForm.Offset)
                .Take(pagingForm.Limit)
                .ToArrayAsync();

            return result;
        }

        public Task<int> Save()
        {
            return _db.SaveChangesAsync();
        }
    }
}
