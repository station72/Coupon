namespace Coupon.Common.Options
{
    public class RedisOptions
    {
        public EndPoint[] EndPoints { get; set; }
    }

    public class EndPoint
    {
        public string Host { get; set; }

        public int Port { get; set; }
    }
}
