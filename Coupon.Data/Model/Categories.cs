using Coupon.Common.Constants;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Coupon.Data.Model
{
    public class Categories
    {
        public int Id { get; set; }

        [MaxLength(CategoryConstants.FriendlyUrlMaxLength)]
        public string FriendlyUrl { get; set; }

        [Required]
        [MaxLength(CategoryConstants.TitleMaxLength)]
        public string Title { get; set; }

        public bool IsDeleted { get; set; }

        public int? ParentId { get; set; }

        [ForeignKey(nameof(ParentId))]
        public Categories Parent { get; set; }

        //[InverseProperty(nameof(ParentId))]
        public IList<Categories> Children { get; set; }
    }
}
