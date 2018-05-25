using AutoMapper;
using Coupon.DAL;
using Coupon.Data;
using Coupon.Data.Cache;
using Coupon.Services;
using Coupon.Web.Utils.Attributes;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Diagnostics;
using System.Reflection;

namespace Coupon.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc(opt =>
            {
                opt.Filters.Add(new ValidationInputAttribute());
                //opt.Filters.Add(new UnhandledExceptionFilterAttribute());
            });

            services.AddDistributedRedisCache(options =>
            {
                options.InstanceName = Configuration.GetValue<string>("redis:name");
                options.Configuration = Configuration.GetValue<string>("redis:host");
            });

            services.AddAutoMapper(typeof(AutomapperConfiguration).GetTypeInfo().Assembly);

            //cache
            services.AddScoped<IRedisConnectionFactory, RedisConnectionFactory>();
            services.AddScoped<IProductsCache, ProductsCache>();

            //repositories
            services.AddScoped<IProductsRepository, ProductsRepository>();

            //services
            services.AddScoped<IProductsService, ProductsService>();
            services.AddScoped<ICategoriesService, CategoriesService>();

            var connection = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<CouponDbContext>(options => options.UseSqlServer(connection));
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseBrowserLink();
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler(appBuilder =>
                {
                    appBuilder.Run(async context =>
                    {
                        context.Response.StatusCode = 500;
                        await context.Response.WriteAsync("An unexpected fault happened");
                    });
                });
            }

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
