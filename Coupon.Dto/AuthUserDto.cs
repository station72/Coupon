using Coupon.Common.Enums;
using System;

namespace Coupon.Dto
{
    public class AuthUserDto
    {
        public Guid Id { get; set; }

        public AdminRole Role { get; set; }

        public string Name { get; set; }
    }
}
