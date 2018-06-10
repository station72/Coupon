using Coupon.Dto;
using Coupon.Forms.Common;
using Coupon.Forms.Provider;
using Coupon.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Coupon.Admin.Controllers
{
    [Route("api/providers")]
    public class ProvidersController : CouponBaseController
    {
        private readonly IProvidersService _providersService;

        public ProvidersController(IProvidersService providersService)
        {
            _providersService = providersService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateProvider([FromBody] ProviderCreateForm createForm)
        {
            var result = await _providersService.CreateAsync(createForm);
            return CreatedAtRoute(nameof(GetProvider), new { id = result.Id }, result);
        }

        [HttpGet("{id:guid}", Name = nameof(GetProvider))]
        public async Task<IActionResult> GetProvider(Guid id)
        {
            var result = await _providersService.GetAsync(id);
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetList(PagingForm form)
        {
            var res = await _providersService.ListAsync(form);
            var total = await _providersService.TotalAsync(form);
            form.Total = total;
            var listResult = new ListResult<IEnumerable<ProviderDto>>
            {
                Paging = form,
                Result = res
            };
            return Ok(listResult);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody]ProviderUpdateForm form)
        {
            var result = await _providersService.UpdateAsync(id, form);
            return Ok(result);
        }
    }
}
