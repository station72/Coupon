using Coupon.Forms.Common.Interfaces;
using System;

namespace Coupon.Forms.Provider
{
    public class ProviderUpdateForm : ProviderCreateForm, INormalized<ProviderUpdateForm>
    {
        ProviderUpdateForm INormalized<ProviderUpdateForm>.Normalize()
        {
            return new ProviderUpdateForm
            {
                Email = Email.Trim().ToLower(),
                Title = Title.Trim()
            };
        }
    }
}
