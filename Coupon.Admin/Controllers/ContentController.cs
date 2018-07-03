using Coupon.Common;
using Coupon.Common.Constants;
using Coupon.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Coupon.Admin.Controllers
{
    [EnableCors(CorsConstants.MainPolicy)]
    [Produces("application/json")]
    [Route("api/content")]
    public class ContentController : CouponBaseController
    {
        private readonly IContentService _contentService;

        public ContentController(IContentService contentService)
        {
            _contentService = contentService;
        }

        [HttpPost("images/upload")]
        [Authorize(Roles = "Provider, Admin, SuperAdmin")] //TODO: move to policy
        public async Task<IActionResult> UploadImage([FromForm]IFormFile file)
        {
            if (file == null)
            {
                throw new CouponException("Файл пустой");
            }
            var result = await _contentService.UploadImageAsync(file, HttpContext.Request.Host.Value);
            return Ok(result);
        }
    }
}
