using Coupon.Dto;
using Coupon.Forms.Admin;
using Coupon.Forms.Auth;
using Coupon.Forms.Common;
using Coupon.Forms.Common.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Coupon.Services
{
    public interface IAdminService
    {
        Task<AdminDto> GetForLoginAsync(INormalized<LoginForm> form);

        Task<AdminDto> GetAsync(int id);

        Task<AdminDto> CreateAsync(INormalized<AdminCreateForm> rawForm);

        Task<IEnumerable<AdminDto>> GetListAsync(PagingForm form);

        Task<int> GetTotalCount();

        Task<AdminDto> UpdateAsync(int id, AdminUpdateForm form);

        Task DeleteAsync(int id);

        Task UpdatePasswordAsync(int id, PasswordUpdateForm form);
    }
}
