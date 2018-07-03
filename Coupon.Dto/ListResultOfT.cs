using Coupon.Forms.Common;

namespace Coupon.Dto
{
    public class ListResult<T>
    {
        //TODO: change T to IEnumerable<T>
        public T Result { get; set; }

        public PagingForm Paging { get; set; }
    }
}
