using Coupon.Common.Enums;
using Coupon.Dto;
using Coupon.Forms.Auth;
using System;
using System.Threading.Tasks;

namespace Coupon.Services
{
    public class AdminService : IAdminService
    {
        public async Task<AdminDto> GetAsync(LoginForm form)
        {
            return await Task.FromResult(new AdminDto
            {
                Role = AdminRole.SuperAdmin,
                Id = Guid.Parse("59d67875-b455-489b-a080-44879a166565"),
                Name = form.UserName
            });

        }
    }
}
