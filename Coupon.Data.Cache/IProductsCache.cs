using Coupon.Data.Cache.Infrastructure;
using Coupon.Data.Model;
using System.Threading.Tasks;

namespace Coupon.Data.Cache
{
    public interface IProductsCache
    {
        Task<CacheResult<Products>> GetAsync(int id);

        Task AddOrUpdateAsync(Products product);
    }
}
