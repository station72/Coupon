using Coupon.Common.Constants;
using Coupon.Forms.Admin;
using Coupon.Forms.Auth;
using Coupon.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Coupon.Admin.Controllers
{
    [EnableCors(CorsConstants.MainPolicy)]
    [Route("/api/auth")]
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

        [HttpGet("test")]
        [Authorize("SuperAdmin")]
        public IActionResult Test()
        {
            return Ok("Works");
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginForm form)
        {
            var userDto = await _adminService.GetForLoginAsync(form);

            var claims = new Claim[]
            {
                new Claim(AuthConstants.ClaimNames.Id, userDto.Id.ToString()),
                new Claim(AuthConstants.ClaimNames.Token, userDto.Token.ToString()),
                new Claim(AuthConstants.ClaimNames.ProviderId, userDto.ProviderId ==  0 ? "": userDto.ProviderId.ToString()),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, userDto.Role.ToString()),
            };

            var claimsIdentity = new ClaimsIdentity(claims);
            var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);

            await _authentication.SignInAsync(HttpContext,
                CookieAuthenticationDefaults.AuthenticationScheme,
                claimsPrincipal,
                new AuthenticationProperties
                {
                    ExpiresUtc = DateTime.UtcNow.AddDays(1)
                });

            return Ok(userDto);
        }

        [HttpPost("/logout")]
        public async Task<IActionResult> Logout()
        {
            await _authentication.SignOutAsync(HttpContext,
                CookieAuthenticationDefaults.AuthenticationScheme,
                new AuthenticationProperties());

            return Ok();
        }

        [HttpPut("{id:int}/password")]
        public async Task<IActionResult> UpdatePassword(int id, PasswordUpdateForm form)
        {
            await _adminService.UpdatePasswordAsync(id, form);
            return Ok();
        }
    }
}
