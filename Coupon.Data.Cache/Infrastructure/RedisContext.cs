using Coupon.Common.Options;
using Microsoft.Extensions.Options;
using StackExchange.Redis;

namespace Coupon.Data.Cache.Infrastructure
{
    public class RedisContext : IRedisContext
    {
        private readonly ConnectionMultiplexer _connectionMultiplexer;

        public RedisContext(
            IOptions<RedisOptions> redisOptions
            )
        {
            var opt = new ConfigurationOptions
            {
                ResponseTimeout = 5000,
                ConnectTimeout = 7000,
                SyncTimeout = 3000,
                AbortOnConnectFail = false
            };

            foreach (var item in redisOptions.Value.EndPoints)
            {
                opt.EndPoints.Add(item.Host, item.Port);
            }

            _connectionMultiplexer = ConnectionMultiplexer.Connect(opt);
        }

        public bool Connected => true;

        public IDatabase Database => _connectionMultiplexer.GetDatabase();
    }
}
