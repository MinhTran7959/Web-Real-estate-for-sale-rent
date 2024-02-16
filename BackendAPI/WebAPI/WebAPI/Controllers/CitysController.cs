using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.DTOs;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CitysController : ControllerBase
    {

        private readonly IUnitOfWork uow;

        public CitysController(IUnitOfWork uow) {
            this.uow = uow;
        }

        [HttpGet("ListCiTy")]
        public async Task<IActionResult> GetCities()
        {
            var cities = await uow.cityRepository.GetCitiesAsync();
            var citiesDto = from c in cities
                            select new CityDTO
                            {
                                Id = c.Id,
                                Name = c.Name,
                            };
            return Ok(citiesDto);
        }


        [HttpPost("Post")]
        public async Task<IActionResult> AddCities(CityDTO cityDto)
        {
            var city = new City
            {
                Name = cityDto.Name,
                LastUpdate = DateTime.Now,
                LastUpdateBy = 1,

            };
            await uow.cityRepository.AddCitiesAsync(city);
            await uow.SaveAsync();

            return StatusCode(201);
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteCities(int id )
        {
            await  uow.cityRepository.DeleteCitiesAsync(id);
            await  uow.SaveAsync();
            return StatusCode(201);
        }
    } 
}
