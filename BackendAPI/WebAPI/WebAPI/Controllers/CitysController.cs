using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.DTOs;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    //[Route("[controller]")]
    //[ApiController]
    [Authorize]
    public class CitysController : BaseController
    {

        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public CitysController(IUnitOfWork uow , IMapper mapper) {
            this.uow = uow;
            this.mapper = mapper;
        }
        [AllowAnonymous]
        [HttpGet("GetCity")]
        public async Task<IActionResult> GetCities()
        {
            //throw new UnauthorizedAccessException();
            var cities = await uow.cityRepository.GetCitiesAsync();
            var citiesDto = mapper.Map<IEnumerable<CityDTO>>(cities);
            return Ok(citiesDto);
        }


        [HttpPost("PostCity")]
        public async Task<IActionResult> AddCities(CityDTO cityDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var city = mapper.Map<City>(cityDto);
            //city.LastUpdate = DateTime.UtcNow;
            //city.LastUpdateBy = 1;
         
            await uow.cityRepository.AddCitiesAsync(city);
            await uow.SaveAsync();

            return StatusCode(201);
        }

        [HttpPut("Update/{id}")]
        public async Task<IActionResult> UpdateCity(int id ,CityDTO cityDto)
        {
            try
            {
                if (id == cityDto.Id)
                {
                    return BadRequest("Update error occured");
                }
                var cityFromDB = await uow.cityRepository.FindCity(id);
                if (cityFromDB == null)
                {
                    return BadRequest("Update error occured");
                }
                else
                {
                    //cityFromDB.LastUpDateon = DateTime.Now;
                   // cityFromDB.LastUpdateBy = 1;
                    mapper.Map(cityDto, cityFromDB);
                    //throw new Exception("Some unknown error occured");
                    await uow.SaveAsync();
                    return StatusCode(200);
                }
            }
            catch
            {
                return StatusCode(500, "Some unknown error occured");
            }
            
          
        }

//[
//  {
//   "path": "/name","op": "replace", "value": "Atlanta1"
//  }
//]
        //[HttpPatch("UpdatePatch/{id}")]
        //public async Task<IActionResult> UpdateCityPatch(int id, JsonPatchDocument<City> CityToPatch)
        //{
        //    var cityFromDB = await uow.cityRepository.FindCity(id);
        //    cityFromDB.LastUpdate = DateTime.UtcNow;
        //    cityFromDB.LastUpdateBy = 1;
        //    //mapper.Map(cityDto, cityFromDB);
        //    CityToPatch.ApplyTo(cityFromDB, ModelState);
        //    await uow.SaveAsync();
        //    return StatusCode(200);
        //}
        [HttpDelete("DeleteCity/{id}")]
        public async Task<IActionResult> DeleteCities(int id )
        {
            await  uow.cityRepository.DeleteCitiesAsync(id);
            await  uow.SaveAsync();
            return StatusCode(201);
        }
    } 
}
