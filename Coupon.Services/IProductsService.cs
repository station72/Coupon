using System.Threading.Tasks;
using Coupon.Forms;
using Coupon.Dto;

namespace Coupon.Services
{
    public interface IProductsService
    {
        Task<ProductDto> CreateAsync(ProductCreateForm form);

        Task<ProductDto> GetAsync(int id);

        Task<ProductDto> UpdateAsync(int id, ProductUpdateForm form);
    }
}
