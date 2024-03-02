using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{

    public class PropertyTypeController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public PropertyTypeController(IUnitOfWork uow , IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
        }

        [HttpGet("List")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPropertyType() {
            var propertyTypes = await uow.propertyTypeRepository.GetPropertyTypeAsync();
            var propertyTypesDTO = mapper.Map<IEnumerable<KeyValuePairDTO>>(propertyTypes);
            return Ok(propertyTypesDTO);
        }

        [HttpGet("Details/{id}")]
        public async Task<ActionResult> GetdetailsFurnishing(int id)
        {
            var furnishing = await uow.propertyTypeRepository.GetByIdProperty(id);
            var furnishingDTO = mapper.Map<KeyValuePairDTO>(furnishing);
            return Ok(furnishingDTO);
        }
        [Authorize]
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeletePropertyAsync(int id)
        {
            await uow.propertyTypeRepository.DeletePropertyAsync(id);
            await uow.SaveAsync();
            return StatusCode(201);
        }
        [Authorize]
        [HttpPost("AddCPropertyAsync")]
        public async Task<ActionResult> AddCPropertyAsync(PropertyType propertyType)
        {
            await uow.propertyTypeRepository.AddCPropertyAsync(propertyType);
            await uow.SaveAsync();
            return StatusCode(201);
        }


    }
}
