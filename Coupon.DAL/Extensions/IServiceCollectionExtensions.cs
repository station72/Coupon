using Coupon.Data.Cache.Extensions;
using Microsoft.Extensions.DependencyInjection;

namespace Coupon.DAL.Extensions
{
    public static class IServiceCollectionExtensions
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            return services.AddScoped<IProductsRepository, ProductsRepository>()
                .AddCache();
        }
    }
}
