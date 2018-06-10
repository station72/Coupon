using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Diagnostics;

namespace Coupon.Web.Utils.Attributes
{
    public class ValidationInputAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            foreach (var key in context.HttpContext.Request.Headers.Keys)
            {
               Debug.WriteLine(key + " = " +  context.HttpContext.Request.Headers[key]);
            }
            if (context.ModelState.IsValid)
                return;

            context.Result = new BadRequestObjectResult(context.ModelState);
        }
    }
}
