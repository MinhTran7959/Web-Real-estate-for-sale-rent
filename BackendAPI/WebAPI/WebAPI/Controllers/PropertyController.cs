using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]

    public class PropertyController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public PropertyController( IUnitOfWork uow , IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
        }
        [HttpGet("list/{SellRent}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPropertyList( int SellRent)
        {
            var properties = await uow.PropertyRepository.GetPropertiesAsync(SellRent);
            var propertiesDTO = mapper.Map<IEnumerable<PropertyListDTO>>(properties);
            return Ok(propertiesDTO);
        }

        [HttpGet("Details/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPropertyDetails(int id)
        {
            var property = await uow.PropertyRepository.GetPropertiesDetailsAsync(id);
            var propertyDTO = mapper.Map<PropertyDetailsDTO>(property);
            return Ok(propertyDTO);
        }     
        
        [HttpPost("Add")]
        [Authorize]
        public async Task<IActionResult> AddProperty(PropertyDTO propertyDTO)
        {
         var property = mapper.Map<Property>(propertyDTO);
            var userId= GetUserId();
            property.PostedBy = userId;
            property.LastUpdatedBy = userId;
            await uow.PropertyRepository.AddPropertiesAsync(property);
            await uow.SaveAsync();
            return StatusCode(201);


        }
    }
}
