using Coupon.Common.Constants;
using Coupon.Common.Enums;
using Coupon.DAL;
using Coupon.Data.Cache;
using Coupon.Data.Cache.Infrastructure;
using Coupon.Data.Utils;
using Coupon.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Coupon.Admin.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddCouponAuthorization(this IServiceCollection services)
        {
            var supAdmReq = new AssertionRequirement(context =>
            {
                var claim = context.User?.Claims
                .FirstOrDefault(u => u.Type == ClaimsIdentity.DefaultRoleClaimType);

                if (claim == null)
                    return false;

                return claim.Value == AdminRole.SuperAdmin.ToString();
            });


            var admOrHighReq = new AssertionRequirement(context =>
            {
                var claim = context.User?.Claims
                .FirstOrDefault(u => u.Type == ClaimsIdentity.DefaultRoleClaimType);

                if (claim == null)
                    return false;

                return claim.Value == AdminRole.SuperAdmin.ToString()
                                    || claim.Value == AdminRole.Admin.ToString();
            });

            var superAdminPolicy = new AuthorizationPolicy(
                    new List<IAuthorizationRequirement> { supAdmReq },
                    new string[] { CookieAuthenticationDefaults.AuthenticationScheme });


            services.AddAuthorization(conf =>
            {
                conf.AddPolicy(AuthConstants.Policies.SuperAdmin, superAdminPolicy);

                conf.AddPolicy(AuthConstants.Policies.AdminOrHigher, new AuthorizationPolicy(
                    new List<IAuthorizationRequirement> { admOrHighReq },
                    new string[] { CookieAuthenticationDefaults.AuthenticationScheme }));

                conf.DefaultPolicy = superAdminPolicy;
            });

            return services;
        }

        public static IServiceCollection AddCouponServices(this IServiceCollection services)
        {
            services.AddScoped<IProvidersService, ProvidersService>();
            services.AddScoped<IAdminService, AdminService>();
            services.AddScoped<ICategoriesService, CategoriesService>();
            services.AddScoped<IContentService, ContentService>();

            services.AddScoped<IProductsService, ProductsService>();
            services.AddScoped<IProductsRepository, ProductsRepository>();
            services.AddScoped<IProductsCache, ProductsCache>();
            services.AddScoped<IRedisContext, RedisContext>();
            services.AddScoped<ICacheSerializer, CacheSerializer>();

            services.AddSingleton<IRawSqlQuery, RawSqlQuery>();
            services.AddScoped<IImagesService, ImagesService>();

            return services;
        }

        public static IServiceCollection AddCouponCors(this IServiceCollection services)
        {
            services.AddCors(options =>
             {
                 options.AddPolicy(CorsConstants.MainPolicy,
                     builder => builder
                     .SetIsOriginAllowed(origin =>
                     {
                         return origin == "http://localhost:4200";
                     })
                     .AllowAnyHeader()
                     .AllowAnyMethod()
                     .AllowCredentials());
             });

            return services;
        }

        public static IServiceCollection AddCouponAuthentication(this IServiceCollection services)
        {
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

            return services;
        }

    }
}
