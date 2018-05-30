using Coupon.Dto;
using Coupon.Forms;
using Coupon.Forms.Common;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Coupon.Services
{
    public interface IProvidersService
    {
        Task<ProviderDto> CreateAsync(ProviderCreateForm createForm);

        Task<IEnumerable<ProviderDto>> ListAsync(PagingForm form);

        Task<ProviderDto> GetAsync(Guid id);
    }
}
