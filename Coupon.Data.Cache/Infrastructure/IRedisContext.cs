using StackExchange.Redis;

namespace Coupon.Data.Cache.Infrastructure
{
    public interface IRedisContext
    {
        bool Connected { get; }

        IDatabase Database { get;  }
    }
}