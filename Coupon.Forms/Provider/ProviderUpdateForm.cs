using Coupon.Common.Constants;
using Coupon.Forms.Common.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Coupon.Forms.Provider
{
    public class ProviderUpdateForm :ProviderBaseForm, INormalized<ProviderUpdateForm>
    {
        [MinLength(ProviderConstants.PasswordMinLength)]
        [MaxLength(ProviderConstants.PasswordMaxLength)]
        public string Password { get; set; }

        ProviderUpdateForm INormalized<ProviderUpdateForm>.Normalize()
        {
            return new ProviderUpdateForm
            {
                Email = Email.Trim().ToLower(),
                Title = Title.Trim(),
                Password = Password
            };
        }
    }
}
