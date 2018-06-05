using Coupon.Common.Enums;
using System;

namespace Coupon.Dto
{
    public class AdminDto
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public AdminRole Role { get; set; }
    }
}
