using Coupon.Common.Enums;

namespace Coupon.Dto
{
    public class AdminDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Login { get; set; }

        public AdminRole Role { get; set; }
    }
}
