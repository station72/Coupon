using Coupon.Common;
using Coupon.Forms;
using Coupon.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Coupon.Admin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProvidersController : Controller
    {
        //private readonly IProvidersService _providersService;

        //public ProvidersController(IProvidersService providersService)
        //{
        //    _providersService = providersService;
        //}

        //[HttpPost]
        //public async Task<IActionResult> CreateProvider([FromBody] ProviderCreateForm createForm)
        //{
        //    try
        //    {
        //        var result = await _providersService.CreateAsync(createForm);
        //        return CreatedAtRoute("", result);
        //    }
        //    catch (CouponException ex)
        //    {
        //        //TODO: вынести это в фильтр
        //        ModelState.AddModelError(ex.Field, ex.Message);
        //        return new BadRequestObjectResult(ModelState);
        //    }
        //}

        //[HttpGet]
        //[Route("/{id}")]
        //public async Task<IActionResult> GetProvider(Guid id)
        //{
        //    //TODO: move to a filter
        //    if (id.Equals(Guid.Empty))
        //    {
        //        ModelState.AddModelError(nameof(id), "Id не может быть пустым.");
        //        return new BadRequestObjectResult(ModelState);
        //    }
        //    try
        //    {
        //        var result = await _providersService.GetAsync(id);
        //        return Ok(result);
        //    }
        //    catch (NotFoundException)
        //    {
        //        //TODO: зачем передавать объект?
        //        return NotFound();
        //    }
        //    //TODO: move to separate method
        //    catch (CouponException ex)
        //    {
        //        ModelState.AddModelError(ex.Field, ex.Message);
        //        return new BadRequestObjectResult(ModelState);
        //    }
        //}
    }
}
