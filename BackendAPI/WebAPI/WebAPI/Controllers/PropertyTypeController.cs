using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;
using WebAPI.Interfaces;

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
    }
}
