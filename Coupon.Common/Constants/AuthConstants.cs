namespace Coupon.Common.Constants
{
    public static class AuthConstants
    {
        public class Roles
        {
            public const string Provider = "Provider";
            public const string Admin = "Admin";
            public const string SuperAdmin = "SuperAdmin";
        }

        public class Policies
        {
            public const string SuperAdmin = "SuperAdmin";
            public const string AdminOrHigher = "AdminOrHigher";
        }

        public class ClaimNames
        {
            public const string Id = "id";
            public const string Token = "token";
            public const string ProviderId = "providerId";
        }
    }
}
