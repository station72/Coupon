using System.Collections.Generic;
using System.Threading.Tasks;
using Coupon.Dto;
using Coupon.Forms.Admin;
using Coupon.Forms.Common;
using Coupon.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Coupon.Admin.Controllers
{
    [Produces("application/json")]
    [Route("api/admins")]
    [EnableCors("CorsPolicy")]
    public class AdminsController : Controller
    {
        private readonly IAdminService _adminService;

        public AdminsController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpPost("")]
        public async Task<IActionResult> Create([FromBody]AdminCreateForm form)
        {
            var created = await _adminService.CreateAsync(form);
            return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
        }

        [HttpGet("{id:int}", Name = nameof(Get))]
        public async Task<IActionResult> Get(int id)
        {
            var admin = await _adminService.GetAsync(id);
            return Ok(admin);
        }

        //TODO: test it
        [HttpGet("")]
        public async Task<IActionResult> GetList(PagingForm form)
        {
            var list = await _adminService.GetListAsync(form);
            form.Total = await _adminService.GetTotalCount();
            var result = new ListResult<IEnumerable<AdminDto>>
            {
                Paging = form,
                Result = list
            };

            return Ok(result);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody]AdminUpdateForm form)
        {
            var updated = await _adminService.UpdateAsync(id, form);
            return Ok(updated);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _adminService.DeleteAsync(id);
            return NoContent();
        }
    }
}
