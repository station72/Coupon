using System;
using System.ComponentModel.DataAnnotations;

namespace Coupon.Forms.Common
{
    public class IdGuidForm
    {
        [Required]
        public Guid Id { get; set; }
    }
}
