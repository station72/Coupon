using Coupon.Common.Enums;
using Coupon.Forms.Auth;
using Coupon.Forms.Common.Interfaces;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Coupon.Forms.Admin
{
    public class CreateAdminForm : IValidatableObject, INormalized<CreateAdminForm>
    {
        [Required]
        public string Login { get; set; }

        public string Name { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }

        public AdminRole Role { get; set; }

        public CreateAdminForm Normalize()
        {
            return new CreateAdminForm
            {
                Email = Email.Trim().ToLower(),
                Login = Login,
                Name = Name?.Trim(),
                Password = Password,
                Role = Role
            };
        }

        //TODO: copy paste
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var errors = new List<ValidationResult>();
            if (!(Role == AdminRole.Admin || Role == AdminRole.SuperAdmin))
            {
                errors.Add(new ValidationResult("Указана некорректная роль", new string[] { nameof(Role) }));
            }
            return errors;
        }
    }
}
