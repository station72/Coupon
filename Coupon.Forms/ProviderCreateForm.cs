using Coupon.Common.Constants;
using System.ComponentModel.DataAnnotations;

namespace Coupon.Forms
{
    public class ProviderCreateForm
    {
        [Required]
        [MaxLength(ProviderConstants.TitleMaxLength)]
        public string Title { get; set; }

        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
    }
}
