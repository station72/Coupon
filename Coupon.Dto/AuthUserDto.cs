using Coupon.Common.Enums;
using System;

namespace Coupon.Dto
{
    public class AuthUserDto
    {
        public int Id { get; set; }

        public Guid Token { get; set; }

        public AdminRole Role { get; set; }

        public int ProviderId { get; set; }
    }
}
