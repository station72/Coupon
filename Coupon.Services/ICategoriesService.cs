using Coupon.Dto;
using Coupon.Forms;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Coupon.Services
{
    public interface ICategoriesService
    {
        Task<CategoryDto> GetAsync(string id);

        Task<IEnumerable<CategoryDto>> ListAsync();

        Task<CategoryDto> CreateAsync(ServiceCreateForm form);
    }
}
