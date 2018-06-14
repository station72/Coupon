using Coupon.Common.Constants;
using Coupon.Forms.Common.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Coupon.Forms.Provider
{
    public class ProviderCreateForm : INormalized<ProviderCreateForm>
    {
        [Required]
        [MaxLength(ProviderConstants.TitleMaxLength)]
        public string Title { get; set; }

        //TODO: пропускает кириллицу
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        public ProviderCreateForm Normalize()
        {
            return new ProviderCreateForm
            {
                Title = Title.Trim(),
                Email = Email.Trim().ToLower()
            };
        }
    }
}
