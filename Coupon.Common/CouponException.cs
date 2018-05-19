using System;

namespace Coupon.Common
{
    public class CouponException : Exception
    {
        public CouponException() : base()
        {
        }

        public CouponException(string message) : base(message)
        {
        }

        public CouponException(string message, Exception innerException) : base (message, innerException)
        {
        }
    }
}
