using System.Collections.Generic;

namespace Coupon.Dto
{
    public class CategoryDto
    {
        public int Id { get; set; }

        public string Title { get; set; }

        //public IEnumerable<CategoryDto> Children { get; set; }

        public string FriendlyUrl { get; set; }

        public bool IsParent { get; set; }

        public CategoryDto Parent { get; set; }

        public int? ParentId { get; set; }
    }
}
