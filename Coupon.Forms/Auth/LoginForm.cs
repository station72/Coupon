using System.ComponentModel.DataAnnotations;

namespace Coupon.Forms.Auth
{
    public class LoginForm
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
