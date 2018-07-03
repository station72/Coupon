using Coupon.Common.Constants;
using Coupon.Dto;
using Coupon.Forms.Common;
using Coupon.Forms.Product;
using Coupon.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Coupon.Admin.Controllers
{
    [EnableCors(CorsConstants.MainPolicy)]
    [Produces("application/json")]
    [Route("api/products")]
    public class ProductsController : CouponBaseController
    {
        private readonly IProductsService _productsService;
        public ProductsController(IProductsService productsService)
        {
            _productsService = productsService;
        }

        [HttpGet("{id}", Name = nameof(GetProduct))]
        [Authorize(Roles = "Provider, Admin, SuperAdmin")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var res = await _productsService.GetAsync(id);
            return Ok(res);
        }

        [HttpGet("")]
        [Authorize(Roles = "Provider, Admin, SuperAdmin")]
        public async Task<IActionResult> GetProducts(PagingForm form)
        {
            var res = await _productsService.GetListAsync(form);
            form.Total = await _productsService.GetTotalCount(form);
            var listResult = new ListResult<IEnumerable<ProductDto>>
            {
                Result = res,
                Paging = form
            };

            return Ok(listResult);
        }

        [HttpPost("")]
        [Authorize(Roles = "Provider")]
        public async Task<IActionResult> Create([FromBody]ProductCreateForm form)
        {
            var result = await _productsService.CreateAsProviderAsync(CurrentUser.Id, CurrentUser.ProviderId, form);
            return CreatedAtAction(nameof(GetProduct), new { id = result.Id }, result);
        }
    }
}
