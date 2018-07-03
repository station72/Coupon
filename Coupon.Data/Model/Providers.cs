using Coupon.Common.Constants;
using Coupon.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Coupon.Data.Model
{
    public class Providers : ILogin
    {
        public int Id { get; set; }

        public Guid Token { get; set; }

        [Required]
        [MaxLength(ProviderConstants.TitleMaxLength)]
        public string Title { get; set; }

        [Required]
        [MaxLength(ProviderConstants.EmailMaxLength)]
        public string Email { get; set; }

        [Required]
        [MaxLength(ProviderConstants.LoginMaxLength)]
        public string Login { get; set; }

        public string PasswordHash { get; set; }

        public string PasswordSalt { get; set; }

        public IList<Products> Products { get; set; }

        public bool IsDeleted { get; set; }

        public bool IsBlocked { get; set; }
    }
}
