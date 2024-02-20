using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;
using WebAPI.Interfaces;

namespace WebAPI.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    public class FurnishingTypeController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public FurnishingTypeController(IUnitOfWork uow , IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
        }

        [HttpGet("List")]
        public async Task<ActionResult> GetListFurnishing()
        {
            var furnishing = await uow.furnishingRepository.GetListFurnishing();
            var furnishingDTO = mapper.Map<IEnumerable<KeyValuePairDTO>>(furnishing);
            return Ok(furnishingDTO);
        }
    }
}
