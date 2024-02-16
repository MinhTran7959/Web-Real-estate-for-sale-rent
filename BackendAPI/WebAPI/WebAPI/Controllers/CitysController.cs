using AutoMapper;
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
        private readonly IMapper mapper;

        public CitysController(IUnitOfWork uow , IMapper mapper) {
            this.uow = uow;
            this.mapper = mapper;
        }

        [HttpGet("ListCiTy")]
        public async Task<IActionResult> GetCities()
        {
            var cities = await uow.cityRepository.GetCitiesAsync();
            var citiesDto = mapper.Map<IEnumerable<CityDTO>>(cities);
            return Ok(citiesDto);
        }


        [HttpPost("Post")]
        public async Task<IActionResult> AddCities(CityDTO cityDto)
        {
            var city = mapper.Map<City>(cityDto);
            city.LastUpdate = DateTime.UtcNow;
            city.LastUpdateBy = 1;
            //    = new City
            //{
            //    Name = cityDto.Name,
            //    LastUpdate = DateTime.Now,
            //    LastUpdateBy = 1,

            //};
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
