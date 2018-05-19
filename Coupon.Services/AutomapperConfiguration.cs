using AutoMapper;
using Coupon.Data.Model;
using Coupon.Dto;

namespace Coupon.Services
{
    public class AutomapperConfiguration : Profile
    {
        public AutomapperConfiguration()
        {
            CreateMap<Categories, CategoryDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
                .ForAllOtherMembers(opt => opt.Ignore());

            CreateMap<Products, ProductDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Desc, opt => opt.MapFrom(src => src.Title))
                .ForAllOtherMembers(opt => opt.Ignore());
        }
    }
}
