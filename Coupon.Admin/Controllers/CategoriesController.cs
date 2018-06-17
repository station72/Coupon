using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Coupon.Services;
using Microsoft.AspNetCore.Mvc;

namespace Coupon.Admin.Controllers
{
    [Produces("application/json")]
    [Route("api/categories")]
    public class CategoriesController : Controller
    {
        private readonly CategoriesService _categoriesService;
        public CategoriesController(CategoriesService categoriesService)
        {
            _categoriesService = categoriesService;
        }

        // GET: api/Categories
        [HttpGet("")]
        public async Task<IActionResult> Get([FromQuery] int? parentId)
        {
            throw new NotImplementedException();
        }
    }
}
