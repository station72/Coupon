using Coupon.Common.Enums;
using Coupon.Data;
using Coupon.Data.Model;
using Coupon.Utils.Security;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;

namespace Coupon.Admin
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateWebHostBuilder(args).Build();

            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
                    SeedData(services);
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred seeding the DB.");
                }
            }

            host.Run();
        }

        private static void SeedData(IServiceProvider services)
        {
            var db = services.GetService<CouponDbContext>();
            if(db.AdminUsers.Any(u=>u.Login == "sadmin"))
            {
                return;
            }

            var salt = Salt.Create();
            db.AdminUsers.Add(new AdminUsers
            {
                Email = "veremeyenko-s@yandex.ru",
                Login = "sadmin",
                Role = AdminRole.SuperAdmin,
                Token = Guid.NewGuid(),
                PasswordSalt = salt,
                PasswordHash = Hash.Create("111111", salt)
            });

            db.SaveChanges();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseWebRoot("content")
                .UseStartup<Startup>();
    }
}
