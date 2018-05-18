using Coupon.Data.Model;
using Microsoft.EntityFrameworkCore;

namespace Coupon.Data
{
    public class CouponDbContext : DbContext
    {
        public CouponDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Discounts> Discounts { get; set; }
    }
}
