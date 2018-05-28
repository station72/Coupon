using System.ComponentModel.DataAnnotations;

namespace Coupon.Forms.Common
{
    public class PagingForm
    {
        public PagingForm()
        {
            Limit = 50;
        }

        [Range(1, 50)]
        public int Limit { get; set; }

        [Range(0, int.MaxValue)]
        public int Offset { get; set; }
    }
}
