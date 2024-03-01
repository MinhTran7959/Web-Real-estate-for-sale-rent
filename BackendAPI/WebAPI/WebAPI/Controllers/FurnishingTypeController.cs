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
       // [Authorize]
        [HttpGet("Details/{id}")]
        public async Task<ActionResult> GetdetailsFurnishing(int id )
        {
            var furnishing = await uow.furnishingRepository.GetByIdFurnishing(id);
            var furnishingDTO = mapper.Map<KeyValuePairDTO>(furnishing);
            return Ok(furnishingDTO);
        }
        [Authorize]
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> DeleteFurnishing(int id )
        {
            await uow.furnishingRepository.DeleteFurnishingAsync(id);
            await uow.SaveAsync();
            return StatusCode(201);
        }
        [Authorize]
        [HttpPost("AddFurnishing")]
        public async Task<ActionResult> AddFurnishing(FurnishingType furnishingType )
        {
            await uow.furnishingRepository.AddCFurnishingAsync(furnishingType);
            await uow.SaveAsync();
            return StatusCode(201);
        }




    }
}
