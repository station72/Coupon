using Coupon.Data.Model;
using Microsoft.Extensions.Caching.Distributed;
using StackExchange.Redis;
using System.Threading.Tasks;

namespace Coupon.Data.Cache
{
    public class ProductsCache : IProductsCache
    {
        private readonly IDistributedCache _distributedCache;

        public ProductsCache(IDistributedCache distributedCache)
        {
            _distributedCache = distributedCache;
        }

        public async Task<Products> GetProduct(int id)
        {
            var cacheResult = await _distributedCache.GetStringAsync("product.{id}");
            throw new System.NotImplementedException();
        }
    }
}
