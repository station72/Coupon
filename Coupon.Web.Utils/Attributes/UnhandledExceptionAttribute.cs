using Coupon.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Coupon.Web.Utils.Attributes
{
    public class UnhandledExceptionAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuted(ActionExecutedContext context)
        {
            var ex = context.Exception;

            if (context.Exception == null)
                return;

            if (ex is CouponException)
            {
                var couponEx = ex as CouponException;
                context.ModelState.TryAddModelError(couponEx.Field, couponEx.Message);
                context.Result = new BadRequestObjectResult(context.ModelState);
                context.ExceptionHandled = true;
                return;
            }

            if (ex is NotFoundException)
            {
                context.Result = new NotFoundResult();
                context.ExceptionHandled = true;
                return;
            }
        }
    }
}
