using Coupon.Common.Constants;
using Coupon.Forms.Common.Interfaces;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Coupon.Forms
{
    public class CategoryCreateForm : INormalized<CategoryCreateForm>, IValidatableObject
    {
        [Required]
        [MaxLength(CategoryConstants.TitleMaxLength)]
        public string Title { get; set; }

        [MaxLength(CategoryConstants.FriendlyUrlMaxLength)]
        public string FriendlyUrl { get; set; }

        [Range(1, int.MaxValue)]
        public int? ParentId { get; set; }

        public CategoryCreateForm Normalize()
        {
            return new CategoryCreateForm
            {
                FriendlyUrl = FriendlyUrl?.Trim().ToLower(),
                Title = Title?.Trim(),
                ParentId = ParentId
            };
        }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var result = new List<ValidationResult>();
            int intResult;
            if (!string.IsNullOrWhiteSpace(FriendlyUrl)
                && int.TryParse(FriendlyUrl, out intResult))
            {
                //TODO: test it
                result.Add(new ValidationResult(nameof(FriendlyUrl), new string[] { "Не может быть числом" }));
            }

            return result;
        }
    }
}
