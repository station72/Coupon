using AutoMapper;
using Coupon.Admin.Extensions;
using Coupon.Common.Constants;
using Coupon.Common.Options;
using Coupon.Data;
using Coupon.Services;
using Coupon.Web.Utils.Attributes;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace Coupon.Admin
{
    //www.talkingdotnet.com/implement-asp-net-core-spa-template-feature-in-angular6-app/
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCouponCors();
            services.AddCouponAuthentication();
            services.AddCouponAuthorization();
            services.AddCouponServices();

            services.AddLogging();
            services.AddMvc(opt =>
            {
                opt.Filters.Add(new ValidationInputAttribute());
                opt.Filters.Add(new UnhandledExceptionAttribute());
            });

            services.AddSpaStaticFiles(c =>
            {
                c.RootPath = "ClientApp/dist";
            });

            services.AddAutoMapper(typeof(AutomapperConfiguration).GetTypeInfo().Assembly);

            services.Configure<RedisOptions>(Configuration.GetSection(nameof(RedisOptions)));

            var connection = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<CouponDbContext>(options => options.UseSqlServer(connection));
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCors(CorsConstants.MainPolicy);
            app.UseAuthentication();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                //app.UseHsts();
            }
            //app.UseHttpsRedirection();
            app.UseStaticFiles();
            //app.UseSpaStaticFiles();
            app.UseMvc(routes =>
            {
                routes.MapRoute(name: "default", template: "{controller}/{action}/{id?}");
            });
            /*
            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                //spa.Options.SourcePath = "ClientApp";

                //spa.UseSpaPrerendering(options =>
                //{
                //    options.BootModulePath = $"{spa.Options.SourcePath}/dist-server/main.bundle.js";
                //    options.BootModuleBuilder = env.IsDevelopment()
                //        ? new AngularCliBuilder(npmScript: "build:ssr")
                //        : null;
                //    options.ExcludeUrls = new[] { "/sockjs-node" };
                //});

                //for separate start
                spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");

                //if (env.IsDevelopment())
                //{
                //    spa.UseAngularCliServer(npmScript: "start");
                //}
            });
            */
            
        }
    }
}
