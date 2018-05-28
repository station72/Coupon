using Coupon.Data.Cache.Infrastructure;
using Coupon.Data.Model;
using System;
using System.Threading.Tasks;

namespace Coupon.Data.Cache
{
    public class ProductsCache : IProductsCache
    {
        private readonly IRedisContext _context;
        private readonly ICacheSerializer _cacheResializer;

        public ProductsCache(IRedisContext context, ICacheSerializer cacheResializer)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _cacheResializer = cacheResializer ?? throw new ArgumentNullException(nameof(cacheResializer));
        }

        public async Task AddOrUpdateAsync(Products product)
        {
            product = product ?? throw new NullReferenceException(nameof(product));
            var serialized = _cacheResializer.Serialize(product);
            var result = await _context.Database.StringSetAsync($"products.{product.Id}", serialized);
            if (!result)
            {
                //TODO: write to log
            }
        }

        public async Task<CacheResult<Products>> GetAsync(int id)
        {
            var cacheResult = await _context.Database.StringGetAsync($"products.{id}");
            if (!cacheResult.HasValue)
                return CacheResult<Products>.NoData();

            var product = _cacheResializer.Deserialize<Products>(cacheResult);
            return CacheResult<Products>.Result(product);
        }
    }
}
