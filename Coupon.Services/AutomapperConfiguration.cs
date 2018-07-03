using AutoMapper;
using Coupon.Common.Enums;
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
                //.ForMember(dest => dest.Children, opt => opt.MapFrom(src => src.Children))
                .ForMember(dest => dest.FriendlyUrl, opt => opt.MapFrom(src => src.FriendlyUrl))
                .ForMember(dest => dest.IsParent, opt => opt.MapFrom(src => src.IsParent))
                .ForMember(dest => dest.Parent, opt => opt.MapFrom(src => src.Parent))
                .ForMember(dest => dest.ParentId, opt => opt.MapFrom(src => src.ParentId))
                .ForAllOtherMembers(opt => opt.Ignore());

            CreateMap<Products, ProductDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
                .ForAllOtherMembers(opt => opt.Ignore());

            CreateMap<Providers, ProviderDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.IsBlocked, opt => opt.MapFrom(src => src.IsBlocked))
                .ForAllOtherMembers(opt => opt.Ignore());

            CreateMap<Providers, AuthUserDto>()
               .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
               .ForMember(dest => dest.Role, opt => opt.UseValue(AdminRole.Provider))
               .ForMember(dest => dest.Token, opt => opt.MapFrom(src=>src.Token))
               .ForMember(dest => dest.ProviderId, opt => opt.MapFrom(src => src.Id))
               .ForAllOtherMembers(opt => opt.Ignore());

            CreateMap<AdminUsers, AdminDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Login, opt => opt.MapFrom(src => src.Login))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role))
                .ForMember(dest => dest.IsBlocked, opt => opt.MapFrom(src => src.IsBlocked))
                .ForAllOtherMembers(opt => opt.Ignore());

            CreateMap<AdminUsers, AuthUserDto>()
               .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
               .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role))
               .ForMember(dest => dest.Token, opt => opt.MapFrom(src => src.Token))
               .ForAllOtherMembers(opt => opt.Ignore());

            CreateMap<Images, ImageDto>()
               .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
               .ForMember(dest => dest.OriginalPath, opt => opt.MapFrom(src => src.OriginalPath))
               .ForAllOtherMembers(opt => opt.Ignore());
        }
    }
}
