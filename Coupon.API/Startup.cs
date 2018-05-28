using AutoMapper;
using Coupon.Common.Options;
using Coupon.Data;
using Coupon.Services;
using Coupon.Services.Extensions;
using Coupon.Web.Utils.Attributes;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Serialization;
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
            }).AddJsonOptions(options => {
                var settings = options.SerializerSettings;
                settings.DateFormatHandling = Newtonsoft.Json.DateFormatHandling.IsoDateFormat;
                var resolver = options.SerializerSettings.ContractResolver as DefaultContractResolver;
            });

            //services.AddDistributedRedisCache(options =>
            //{
            //    options.InstanceName = Configuration.GetValue<string>("redis:name");
            //    options.Configuration = Configuration.GetValue<string>("redis:host");
            //});

            services.AddAutoMapper(typeof(AutomapperConfiguration).GetTypeInfo().Assembly);

            services.AddServices();

            services.Configure<RedisOptions>(Configuration.GetSection(nameof(RedisOptions)));
            
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
