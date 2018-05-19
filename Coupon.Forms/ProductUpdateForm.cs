using Coupon.Common.Constants;
using System.ComponentModel.DataAnnotations;

namespace Coupon.Forms
{
    public class ProductUpdateForm
    {
        [Required]
        [MaxLength(ProductConstants.TitleMaxLength)]
        public string Title { get; set; }
    }
}
