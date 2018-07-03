using Coupon.Common;
using Coupon.Common.Constants;
using Coupon.Common.Enums;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Security.Claims;

namespace Coupon.Admin.Controllers
{
    public abstract class CouponBaseController : Controller
    {
        protected BadRequestObjectResult BadInputResult(CouponException ex)
        {
            ModelState.AddModelError(ex.Field, ex.Message);
            return new BadRequestObjectResult(ModelState);
        }

        public AuthUser CurrentUser
        {
            get
            {
                var id = int.Parse(User.Claims.First(u => u.Type == AuthConstants.ClaimNames.Token).Value);
                var token = Guid.Parse(User.Claims.First(u => u.Type == AuthConstants.ClaimNames.Token).Value);
                var role = Enum.Parse<AdminRole>(User.Claims.First(u => u.Type == ClaimsIdentity.DefaultRoleClaimType).Value);
                int providerId;
                var parsed = int.TryParse((User.Claims.FirstOrDefault(u => u.Type == AuthConstants.ClaimNames.ProviderId)?.Value), out providerId);
                return new AuthUser(id, token, role, providerId);
            }
        }
    }

    public class AuthUser
    {
        int? _providerId;

        public AuthUser(int id, Guid token, AdminRole role, int? providerId)
        {
            Id = id;
            Token = token;
            Role = role;
            _providerId = providerId;
        }

        public int Id { get; private set; }

        public Guid Token { get; private set; }

        public AdminRole Role { get; private set; }

        public int ProviderId { get { return _providerId.Value; } }
    }
}
