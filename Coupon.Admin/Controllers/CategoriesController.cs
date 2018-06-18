using System;
using System.Threading.Tasks;
using Coupon.Forms;
using Coupon.Forms.Category;
using Coupon.Services;
using Microsoft.AspNetCore.Mvc;

namespace Coupon.Admin.Controllers
{
    [Produces("application/json")]
    [Route("api/categories")]
    public class CategoriesController : Controller
    {
        private readonly ICategoriesService _categoriesService;
        public CategoriesController(ICategoriesService categoriesService)
        {
            _categoriesService = categoriesService;
        }

        [HttpGet("")]
        public async Task<IActionResult> GetList([FromQuery] int? parentId)
        {
            var list = await _categoriesService.ListAsync(parentId);
            return Ok(list);
        }

        [HttpGet("{id}", Name = nameof(GetCategory))]
        public async Task<IActionResult> GetCategory(string id)
        {
            var category = await _categoriesService.GetAsync(id);
            return Ok(category);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromBody]CategoryCreateForm form)
        {
            var category = await _categoriesService.CreateAsync(form);
            return CreatedAtAction(nameof(GetCategory), new { id = category.Id }, category);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(int id, [FromBody]CategoryUpdateForm form)
        {
            var category = await _categoriesService.UpdateAsync(id, form);
            return Ok(category);
        }

        [HttpPut("{id}/move")]
        public async Task<IActionResult> MoveCategory(int id, [FromBody] CategoryMoveForm form)
        {
            await _categoriesService.MoveToAsync(id, form);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            await _categoriesService.DeleteAsync(id);
            return NoContent();
        }
    }
}
