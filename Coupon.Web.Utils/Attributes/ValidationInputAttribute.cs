using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Coupon.Web.Utils.Attributes
{
    public class ValidationInputAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (context.ModelState.IsValid)
                return;

            context.Result = new BadRequestObjectResult(context.ModelState);
        }
    }
}
