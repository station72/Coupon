using System.ComponentModel.DataAnnotations;

namespace Coupon.Forms.Category
{
    public class CategoryMoveForm
    {
        [Range(1, int.MaxValue)]
        public int? ParentId { get; set; }
    }
}
