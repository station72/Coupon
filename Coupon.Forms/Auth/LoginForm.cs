using Coupon.Forms.Common.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Coupon.Forms.Auth
{
    public class LoginForm : INormalized<LoginForm>
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }

        public LoginForm Normalize()
        {
            return new LoginForm
            {
               UserName = UserName.Trim(),
               Password = Password
            };
        }
    }
}
