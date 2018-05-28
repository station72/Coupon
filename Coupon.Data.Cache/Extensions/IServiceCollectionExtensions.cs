using Coupon.Data.Cache.Infrastructure;
using Microsoft.Extensions.DependencyInjection;

namespace Coupon.Data.Cache.Extensions
{
    public static class IServiceCollectionExtensions
    {
        public static IServiceCollection AddCache(this IServiceCollection services)
        {
            return services
                .AddSingleton<IRedisContext, RedisContext>()
                .AddSingleton<ICacheSerializer, CacheSerializer>()
                .AddSingleton<IProductsCache, ProductsCache>();
        }
    }
}
