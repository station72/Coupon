using Coupon.Dto;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace Coupon.Services
{
    public interface IContentService
    {
        Task<ImageDto> UploadImageAsync(IFormFile file, string host);
    }
}
