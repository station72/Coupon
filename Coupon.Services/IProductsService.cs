using System.Threading.Tasks;
using Coupon.Forms;
using Coupon.Dto;
using System.Collections.Generic;
using Coupon.Forms.Common;

namespace Coupon.Services
{
    public interface IProductsService
    {
        Task<ProductDto> CreateAsync(ProductCreateForm form);

        Task<ProductDto> GetAsync(int id);

        Task<ProductDto> UpdateAsync(int id, ProductUpdateForm form);

        Task DeleteAsync(int id);

        Task<IEnumerable<ProductDto>> GetListAsync(PagingForm pagingForm);
    }
}
