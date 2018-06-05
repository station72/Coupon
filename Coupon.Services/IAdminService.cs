using Coupon.Dto;
using Coupon.Forms.Auth;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Coupon.Services
{
    public interface IAdminService
    {
        Task<AdminDto> GetAsync(LoginForm form);
    }
}
