using System;

namespace Coupon.Data.Interfaces
{
    public interface ILogin
    {
        string Login { get; set; }
        string PasswordHash { get; set; }
        string PasswordSalt { get; set; }
    }
}
