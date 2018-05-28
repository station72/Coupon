using StackExchange.Redis;

namespace Coupon.Data.Cache.Infrastructure
{
    public interface ICacheSerializer
    {
        string Serialize(object product);

        T Deserialize<T>(string data);
    }
}
