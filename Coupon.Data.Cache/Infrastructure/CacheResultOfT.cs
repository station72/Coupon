using Coupon.Data.Model;

namespace Coupon.Data.Cache.Infrastructure
{
    public class CacheResult<T>
    {
        public T Value { get; private set;  }
        public bool Succeded { get; private set; }

        private CacheResult()
        {
        }

        public CacheResult(T data)
        {
            Value = data;
            Succeded = true;
        }

        public static CacheResult<Products> NoData()
        {
            return new CacheResult<Products>
            {
                Value = null,
                Succeded = false
            };
        }

        public static CacheResult<Products> Result(Products product)
        {
            return new CacheResult<Products>
            {
                Value = product,
                Succeded = true
            };
        }
    }
}
