using System;

namespace Coupon.Dto
{
    public class ProviderDto
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Email { get; set; }

        public bool IsBlocked { get; set; }
    }
}
