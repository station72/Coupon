using Coupon.Common.Constants;
using System.ComponentModel.DataAnnotations;

namespace Coupon.Forms.Provider
{
    public abstract class ProviderBaseForm
    {
        [Required]
        [MaxLength(ProviderConstants.TitleMaxLength)]
        public string Title { get; set; }

        //TODO: пропускает кириллицу
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
    }
}
