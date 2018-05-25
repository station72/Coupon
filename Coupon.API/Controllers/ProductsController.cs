using Coupon.Common;
using Coupon.Forms;
using Coupon.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Coupon.API.Controllers
{
    public class ProductsController : BaseController
    {
        private readonly IProductsService _products;
        public ProductsController(IProductsService products)
        {
            _products = products;
        }

        [Route("api/products")]
        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody] ProductCreateForm form)
        {
            var createResult = await _products.CreateAsync(form);
            return CreatedAtRoute(
                nameof(GetProduct),
                new { id = createResult.Id },
                createResult);
        }

        [Route("api/products/{id}", Name = nameof(GetProduct))]
        [HttpGet]
        public async Task<IActionResult> GetProduct(int id)
        {
            try
            {
                var result = await _products.GetAsync(id);
                return Ok(result);
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
            catch (CouponException ex)
            {
                ModelState.AddModelError("", ex.Message);
                return new BadRequestObjectResult(ModelState);
            }
        }

        [Route("api/products/{id}")]
        [HttpPut]
        public async Task<IActionResult> Update(int id, [FromBody] ProductUpdateForm form)
        {
            try
            {
                var result = await _products.UpdateAsync(id, form);
                return Ok(result);
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
        }

        [Route("api/products/{id}")]
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _products.DeleteAsync(id);
                return NoContent();
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
        }
    }
}
