using AutoMapper;
using Coupon.Common.Options;
using Coupon.Data;
using Coupon.Services;
using Coupon.Web.Utils.Attributes;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Net;
using Microsoft.AspNetCore.SpaServices.AngularCli;

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
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder
                    .SetIsOriginAllowed(origin =>
                    {
                        return origin == "http://localhost:4200";
                    })
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials());
            });

            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
            .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, o =>
            {
                o.AccessDeniedPath = new PathString("/api/auth/accessdenied");
                o.Events.OnRedirectToLogin = context =>
                {
                    context.Response.Headers["Location"] = (new PathString("/api/auth/login").ToString());
                    context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                    return Task.CompletedTask;
                };
                o.Cookie = new CookieBuilder()
                {
                    Name = ".auth",
                    HttpOnly = true,
                    //Expiration = TimeSpan.FromSeconds(20)  //it does not affect
                };
                o.LoginPath = new PathString("/api/auth/login");
            });

            AddAuthorization(services);

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

            services.AddScoped<IProvidersService, ProvidersService>();
            services.AddScoped<IAdminService, AdminService>();
            services.AddScoped<ICategoriesService, CategoriesService>();


        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCors("CorsPolicy");
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

        private IServiceCollection AddAuthorization(IServiceCollection services)
        {
            var supAdmReq = new AssertionRequirement(context =>
            {
                var claim = context.User?.Claims
                .FirstOrDefault(u => u.Type == ClaimsIdentity.DefaultRoleClaimType);

                if (claim == null)
                    return false;

                return claim.Value == "SuperAdmin";
            });


            var admOrHighReq = new AssertionRequirement(context =>
            {
                var claim = context.User?.Claims
                .FirstOrDefault(u => u.Type == ClaimsIdentity.DefaultRoleClaimType);

                if (claim == null)
                    return false;

                return claim.Value == "SuperAdmin" || claim.Value == "Admin";
            });

            var superAdminPolicy = new AuthorizationPolicy(
                    new List<IAuthorizationRequirement> { supAdmReq },
                    new string[] { CookieAuthenticationDefaults.AuthenticationScheme });


            services.AddAuthorization(conf =>
            {
                conf.AddPolicy("SuperAdmin", superAdminPolicy);

                conf.AddPolicy("AdminOrHigher", new AuthorizationPolicy(
                    new List<IAuthorizationRequirement> { admOrHighReq },
                    new string[] { CookieAuthenticationDefaults.AuthenticationScheme }));

                conf.DefaultPolicy = superAdminPolicy;
            });

            return services;
        }
    }

}
