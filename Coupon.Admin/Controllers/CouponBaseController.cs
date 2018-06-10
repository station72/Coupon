using Coupon.Common;
using Microsoft.AspNetCore.Mvc;

namespace Coupon.Admin.Controllers
{
    public abstract class CouponBaseController : Controller
    {
        protected BadRequestObjectResult BadInputResult(CouponException ex)
        {
            ModelState.AddModelError(ex.Field, ex.Message);
            return new BadRequestObjectResult(ModelState);
        }
    }
}
