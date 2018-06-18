using Coupon.Forms.Common.Interfaces;

namespace Coupon.Forms.Category
{
    public class CategoryUpdateForm : CategoryCreateForm, INormalized<CategoryUpdateForm>
    {
        CategoryUpdateForm INormalized<CategoryUpdateForm>.Normalize()
        {
            return new CategoryUpdateForm
            {
                Title = Title.Trim(),
                FriendlyUrl = FriendlyUrl?.Trim().ToLower()
            };
        }
    }
}
