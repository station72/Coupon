using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Coupon.Forms.Auth;
using Coupon.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Coupon.Admin.Controllers
{
    //[Produces("application/json")]
    //[Route("api/auth")]
    [EnableCors("CorsPolicy")]
    public class AuthController : Controller
    {
        private readonly IAdminService _adminService;
        private readonly IAuthenticationService _authentication;

        public AuthController(
            IAdminService adminService,
            IAuthenticationService authentication
            )
        {
            _adminService = adminService;
            _authentication = authentication;
        }

        [HttpGet]
        [Route("/api/auth/test")]
        [Authorize]
        public async Task<IActionResult> Test()
        {
            return Content("Works!");
        }


        [HttpPost]
        [Route("/api/auth/login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginForm form)
        {
            if (form.UserName != "sadmin")
            {
                return NoContent();
            }

            var userDto = await _adminService.GetAsync(form);

            var claims = new Claim[]
            {
                new Claim("id", userDto.Id.ToString()),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, "SuperAdmin"),
                new Claim(ClaimsIdentity.DefaultNameClaimType, form.UserName)
            };

            var claimsIdentity = new ClaimsIdentity(claims);
            var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);

            await _authentication.SignInAsync(HttpContext,
                CookieAuthenticationDefaults.AuthenticationScheme,
                claimsPrincipal,
                new AuthenticationProperties
                {
                    ExpiresUtc = DateTimeOffset.UtcNow.AddDays(1)
                });

            return Json(userDto);
        }

        [HttpPost]
        [Route("/api/auth/logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await _authentication.SignOutAsync(HttpContext,
                CookieAuthenticationDefaults.AuthenticationScheme,
                new AuthenticationProperties
                {
                    ExpiresUtc = DateTimeOffset.UtcNow.AddDays(1)
                });

            return Ok();
        }
    }
}
