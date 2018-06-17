using Coupon.Common.Enums;
using Coupon.Forms.Common.Interfaces;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Coupon.Forms.Admin
{
    public class AdminUpdateForm : IValidatableObject, INormalized<AdminUpdateForm>
    {
        [Required]
        public string Login { get; set; }

        public string Name { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        public AdminRole Role { get; set; }

        public AdminUpdateForm Normalize()
        {
            return new AdminUpdateForm
            {
                Email = Email.Trim().ToLower(),
                Login = Login,
                Name = Name?.Trim(),
                Role = Role
            };
        }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            //TODO: copy paste
            var errors = new List<ValidationResult>();
            if (!(Role == AdminRole.Admin || Role == AdminRole.SuperAdmin))
            {
                errors.Add(new ValidationResult("Указана некорректная роль", new string[] { nameof(Role) }));
            }
            return errors;
        }
    }
}
