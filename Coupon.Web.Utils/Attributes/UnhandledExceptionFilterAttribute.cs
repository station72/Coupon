using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Coupon.Web.Utils.Attributes
{
    public class UnhandledExceptionFilterAttribute : IActionFilter
    {

        public UnhandledExceptionFilterAttribute()
        {

        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            if (context.Exception == null)
                return;

            if (context.ExceptionHandled)
                return;

            context.Result = new StatusCodeResult(500);
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
        }
    }
}
