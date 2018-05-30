using System;

namespace Coupon.Common
{
    public class CouponException : Exception
    {
        public string Field { get; private set; }

        public CouponException() : base()
        {
        }

        public CouponException(string message) : base(message)
        {
        }

        public CouponException(string message, string field) : base(message)
        {
            Field = field;
        }

        public CouponException(string message, string field, Exception innerException) : base (message, innerException)
        {
            Field = field;
        }
    }
}
