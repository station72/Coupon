using Coupon.Dto;
using Coupon.Forms;
using Coupon.Forms.Category;
using Coupon.Forms.Common.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Coupon.Services
{
    public interface ICategoriesService
    {
        Task<CategoryDto> GetAsync(string id);

        Task<IEnumerable<CategoryDto>> ListAsync(int? parentId);

        Task<CategoryDto> CreateAsync(INormalized<CategoryCreateForm> form);

        Task<CategoryDto> UpdateAsync(int id, CategoryUpdateForm form);

        Task MoveToAsync(int id, CategoryMoveForm form);

        Task DeleteAsync(int id);
    }
}
