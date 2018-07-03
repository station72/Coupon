using Coupon.Common.Enums;
using Coupon.Data.Interfaces;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Coupon.Data.Model
{
    public class AdminUsers : ILogin
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        /// <summary>
        /// To prevent access Prod server with Dev credentials.
        /// </summary>
        /// 
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Token { get; set; }

        [Required]
        public string Login { get; set; }

        /// <summary>
        /// Фамилия Имя
        /// </summary>
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        //https://stackoverflow.com/questions/2999197/do-i-need-a-random-salt-once-per-password-or-only-once-per-database
        [Required]
        public string PasswordSalt { get; set; }

        public bool IsBlocked { get; set; }

        public bool IsDeleted { get; set; }

        public AdminRole Role { get; set; }
    }
}
