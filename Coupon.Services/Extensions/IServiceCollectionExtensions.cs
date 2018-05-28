using AutoMapper;
using Coupon.DAL.Extensions;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace Coupon.Services.Extensions
{
    public static class IServiceCollectionExtensions
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            return services.AddScoped<IProductsService, ProductsService>()
                .AddScoped<ICategoriesService, CategoriesService>()
                .AddRepositories();
        }
    }
}
