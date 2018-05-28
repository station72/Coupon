using Newtonsoft.Json;
using System;

namespace Coupon.Data.Cache.Infrastructure
{
    public class CacheSerializer : ICacheSerializer
    {
        public T Deserialize<T>(string data)
        {
            data = data ?? throw new ArgumentNullException(nameof(data));
            return JsonConvert.DeserializeObject<T>(data);
        }

        public string Serialize(object product)
        {
            product = product ?? throw new ArgumentNullException(nameof(product));
            return JsonConvert.SerializeObject(product);
        }
    }
}
