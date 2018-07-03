using Coupon.Dto;
using Coupon.Forms.Common;
using Coupon.Forms.Product;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Coupon.Services
{
    public interface IProductsService
    {
        Task<ProductDto> CreateAsProviderAsync(int currentUser, int providerId, ProductCreateForm form);

        Task<ProductDto> GetAsync(int id);

        Task<ProductDto> UpdateAsync(int id, ProductUpdateForm form);

        Task DeleteAsync(int id);

        Task<IEnumerable<ProductDto>> GetListAsync(PagingForm pagingForm);

        Task<int> GetTotalCount(PagingForm form);
    }
}
