using Coupon.Dto;
using Coupon.Forms;
using Coupon.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Coupon.API.Controllers
{
    [Route("api/services")]
    public class CategoriesController : BaseController
    {
        private readonly ICategoriesService _categories;
        public CategoriesController(ICategoriesService categories)
        {
            _categories = categories;
        }

        [HttpPost]
        public async Task<IActionResult> CreateService([FromBody] ServiceCreateForm form)
        {
            var createResult = await _categories.CreateAsync(form);
            return CreatedAtRoute(
                nameof(Get),
                new { id = createResult.Id },
                createResult
                );
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var service = await _categories.GetAsync(id);
            throw new NotImplementedException();
        }

        [HttpGet]
        public async Task<IEnumerable<CategoryDto>> GetList()
        {
            var services = await _categories.ListAsync();
            throw new NotImplementedException();
        }
    }
}
