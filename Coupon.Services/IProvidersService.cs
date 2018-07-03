using Coupon.Dto;
using Coupon.Forms.Common;
using Coupon.Forms.Common.Interfaces;
using Coupon.Forms.Provider;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Coupon.Services
{
    public interface IProvidersService
    {
        Task<ProviderDto> CreateAsync(INormalized<ProviderCreateForm> createForm);

        Task<ProviderDto> GetAsync(int id);

        Task<ProviderDto> UpdateAsync(int id, INormalized<ProviderUpdateForm> form);

        Task<IEnumerable<ProviderDto>> ListAsync(PagingForm form);

        Task<int> TotalAsync(PagingForm form);

        Task SetBlockAsync(int id, bool isBlocked);

        Task DeleteAsync(int id);
    }
}
