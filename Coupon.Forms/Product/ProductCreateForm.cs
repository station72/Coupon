using Coupon.Common.Constants;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Coupon.Forms.Product
{
    public class ProductCreateForm : IValidatableObject
    {
        [Required]
        [MaxLength(ProductConstants.TitleMaxLength)]
        public string Title { get; set; }

        [Required]
        [MaxLength(ProductConstants.FullTitleMaxLength)]
        public string FullTitle { get; set; }

        [Required]
        [MaxLength(ProductConstants.DescriptionMaxLength)]
        public string Description { get; set; }

        [Required]
        [MaxLength(ProductConstants.ConditionsMaxLength)]
        public string Conditions { get; set; }

        [Range(1, int.MaxValue)]
        public int CategoryId { get; set; }

        [Required]
        public IFormFile MainImage { get; set; }

        public IEnumerable<IFormFile> Images { get; set; }

        [Required]
        public DateTimeOffset? ValidFrom { get; set; }

        [Required]
        public DateTimeOffset? ValidUntil { get; set; }

        [Required]
        public decimal? OldPrice { get; set; }

        [Required]
        public decimal? NewPrice { get; set; }

        public int StartAvailableCount { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var results = new List<ValidationResult>();

            //TODO: придумать бизнес правила
            if (DateTimeOffset.Now > ValidUntil)
            {
                results.Add(new ValidationResult("Дата окончания уже прошла", new string[] { nameof(ValidUntil) }));
            }
            if (ValidFrom >= ValidUntil)
            {
                results.Add(new ValidationResult("Дата окончания меньше даты начала", new string[] { nameof(ValidUntil) }));
            }

            return results;
        }
    }
}
