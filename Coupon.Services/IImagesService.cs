using Coupon.Dto;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace Coupon.Services
{
    public interface IImagesService
    {
        Task<ImageDto> SaveImageAsync(IFormFile mainImage);
    }
}
