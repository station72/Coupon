using Coupon.Forms.Product;
using Coupon.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Coupon.Admin.Controllers
{
    [Produces("application/json")]
    [Route("api/products")]
    public class ProductsController : Controller
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

        [HttpPost("")]
        [Authorize(Roles = "Provider")]
        public async Task<IActionResult> Create([FromBody]ProductCreateForm form)
        {
            var result = await _productsService.CreateAsync(form);
            return CreatedAtAction(nameof(GetProduct), new { id = result.Id }, result);
        }

    }
}
