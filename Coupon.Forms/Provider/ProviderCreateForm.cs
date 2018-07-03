using Coupon.Common.Constants;
using Coupon.Forms.Common.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Coupon.Forms.Provider
{
    public class ProviderCreateForm : ProviderBaseForm, INormalized<ProviderCreateForm>
    {
        //TODO: add on the clien side no-whitespace check
        [Required]
        [MinLength(ProviderConstants.LoginMinLength)]
        [MaxLength(ProviderConstants.LoginMaxLength)]
        public string Login { get; set; }

        [Required]
        [MinLength(ProviderConstants.PasswordMinLength)]
        [MaxLength(ProviderConstants.PasswordMaxLength)]
        public string Password { get; set; }

        public ProviderCreateForm Normalize()
        {
            return new ProviderCreateForm
            {
                Title = Title.Trim(),
                Email = Email.Trim().ToLower(),
                Login = Login,
                Password = Password
            };
        }
    }
}
