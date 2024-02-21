using AutoMapper;
using WebAPI.DTOs;
using WebAPI.Models;

namespace WebAPI.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<City, CityDTO>().ReverseMap();
            CreateMap<PropertyType, KeyValuePairDTO>().ReverseMap();
            CreateMap<FurnishingType, KeyValuePairDTO>().ReverseMap();
            CreateMap<Property, PropertyDTO>().ReverseMap();
            CreateMap<Property, PropertyListDTO>()
                .ForMember(x=>x.City,opt=> opt.MapFrom(src=>src.City.Name))
                .ForMember(x => x.Country, opt => opt.MapFrom(src => src.City.Country))
                .ForMember(x=>x.PropertyType,opt=> opt.MapFrom(src=>src.PropertyType.Name))
                .ForMember(x=>x.FurnishingType,opt=> opt.MapFrom(src=>src.FurnishingType.Name))              
                .ReverseMap();
            CreateMap<Property, PropertyDetailsDTO>()
               .ForMember(x => x.City, opt => opt.MapFrom(src => src.City.Name))
               .ForMember(x => x.Country, opt => opt.MapFrom(src => src.City.Country))
               .ForMember(x => x.PropertyType, opt => opt.MapFrom(src => src.PropertyType.Name))
               .ForMember(x => x.FurnishingType, opt => opt.MapFrom(src => src.FurnishingType.Name))
               .ReverseMap();



        }
    }
}
