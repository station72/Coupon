using Coupon.Data.Model;
using Microsoft.EntityFrameworkCore;

namespace Coupon.Data
{
    public class CouponDbContext : DbContext
    {
        public CouponDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<AdminUsers> AdminUsers { get; set; }

        public DbSet<Categories> Categories { get; set; }

        public DbSet<Products> Products { get; set; }

        public DbSet<Providers> Providers { get; set; }
    }
}
