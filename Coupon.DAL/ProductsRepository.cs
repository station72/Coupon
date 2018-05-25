using Coupon.Data;
using Coupon.Data.Model;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Coupon.DAL
{
    public class ProductsRepository : IProductsRepository
    {
        private readonly CouponDbContext _couponDbContext;

        public ProductsRepository(CouponDbContext couponDbContext)
        {
            _couponDbContext = couponDbContext;
        }

        public Products Add(Products product)
        {
            var added = _couponDbContext.Products.Add(product);
            return added.Entity;
        }

        public void Delete(Products product)
        {
            product.IsDeleted = true;
        }

        public async Task<Products> Get(int id)
        {
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
