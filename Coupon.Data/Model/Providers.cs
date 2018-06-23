using Coupon.Common.Constants;
using System;
using System.ComponentModel.DataAnnotations;

namespace Coupon.Data.Model
{
    public class Providers
    {
        public Guid Id { get; set; }

        [Required]
        [MaxLength(ProviderConstants.TitleMaxLength)]
        public string Title { get; set; }

        [Required]
        [MaxLength(ProviderConstants.EmailMaxLength)]
        public string Email { get; set; }

        public bool IsDeleted { get; set; }

        public bool IsBlocked { get; set; }
    }
}
