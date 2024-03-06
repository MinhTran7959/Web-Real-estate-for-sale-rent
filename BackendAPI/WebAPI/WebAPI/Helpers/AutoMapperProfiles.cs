using AutoMapper;
using WebAPI.DTOs;
using WebAPI.Models;

namespace WebAPI.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<City, CityDTO>().ReverseMap();
            CreateMap<PropertyType, KeyValuePairDTO>().ReverseMap();
            CreateMap<FurnishingType, KeyValuePairDTO>().ReverseMap();
            CreateMap<Property, PropertyDTO>().ReverseMap();
            CreateMap<Photo, PhotoDTO>().ReverseMap();

            CreateMap<Property, PropertyListDTO>()
                .ForMember(x=>x.City,opt=> opt.MapFrom(src=>src.City.Name))
                .ForMember(x => x.Country, opt => opt.MapFrom(src => src.City.Country))
                .ForMember(x=>x.PropertyType,opt=> opt.MapFrom(src=>src.PropertyType.Name))
                .ForMember(x=>x.FurnishingType,opt=> opt.MapFrom(src=>src.FurnishingType.Name))              
                .ForMember(x=>x.PostByName, opt=> opt.MapFrom(src=>src.User.Name))              
                .ForMember(x=>x.Photo,opt=> opt.MapFrom(src=>src.Photos.FirstOrDefault(p=>p.IsPrimary).ImageUrl)).ReverseMap();

            CreateMap<FavoritesList, FavoritesListDto>()
                .ForMember(x=>x.City,opt=> opt.MapFrom(src=>src.PropertyList.City.Name))
                .ForMember(x=>x.Name,opt=> opt.MapFrom(src=>src.PropertyList.Name))
                .ForMember(x=>x.View,opt=> opt.MapFrom(src=>src.PropertyList.View))
                .ForMember(x=>x.PropertyId, opt=> opt.MapFrom(src=>src.PropertyList.Id))
                .ForMember(x => x.Country, opt => opt.MapFrom(src => src.PropertyList.City.Country))
                .ForMember(x=>x.PropertyType,opt=> opt.MapFrom(src=>src.PropertyList.PropertyType.Name))
                .ForMember(x=>x.FurnishingType,opt=> opt.MapFrom(src=>src.PropertyList.FurnishingType.Name))              
                .ForMember(x=>x.PostByName, opt=> opt.MapFrom(src=>src.PropertyList.User.Name))              
                .ForMember(x=>x.Photo,opt=> opt.MapFrom(src=>src.PropertyList.Photos.FirstOrDefault(p=>p.IsPrimary).ImageUrl)).ReverseMap();

            CreateMap<Property, PropertyDetailsDTO>()
               .ForMember(x => x.City, opt => opt.MapFrom(src => src.City.Name))
               .ForMember(x => x.Country, opt => opt.MapFrom(src => src.City.Country))
               .ForMember(x => x.PropertyType, opt => opt.MapFrom(src => src.PropertyType.Name))
               .ForMember(x => x.FurnishingType, opt => opt.MapFrom(src => src.FurnishingType.Name))
                .ForMember(x => x.PostByName, opt => opt.MapFrom(src => src.User.Name))
                .ForMember(x => x.Email, opt => opt.MapFrom(src => src.User.Email))
                .ForMember(x => x.Phonenumber, opt => opt.MapFrom(src => src.User.Phonenumber))
                .ForMember(x => x.OtherContactInformation, opt => opt.MapFrom(src => src.User.OtherContactInformation))
               .ReverseMap();
             CreateMap<Property, PropertyDetailsUpdateDTO>()
               .ForMember(x => x.City, opt => opt.MapFrom(src => src.City.Id))
             
               .ForMember(x => x.PropertyType, opt => opt.MapFrom(src => src.PropertyType.Id))
               .ForMember(x => x.FurnishingType, opt => opt.MapFrom(src => src.FurnishingType.Id))
                .ForMember(x => x.PostByName, opt => opt.MapFrom(src => src.User.Name))
               .ReverseMap();



        }
    }
}
