using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SellAndRentHousing.Data;
using SellAndRentHousing.Models;

namespace SellAndRentHousing.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CitysController : ControllerBase
    {
        private DataContext _context;

        public CitysController(DataContext context) {
            _context = context;
        }

        [HttpGet("ListCiTy")]
        public async Task<IActionResult> GetCities()
        {
            var cities = await _context.Cities.ToListAsync();
            return Ok(cities);
        }

        [HttpPost("Add/{cityName}")]
        public async Task<IActionResult> AddCities( string cityName)
        {
            City city = new City();
             city.Name = cityName;
             await _context.Cities.AddAsync(city);
             await _context.SaveChangesAsync();

            return Ok(city);
        }
        // post city = list json 
        [HttpPost("Post")]
        public async Task<IActionResult> AddCitiesJson(City city)
        {         
            await _context.Cities.AddAsync(city);
            await _context.SaveChangesAsync();

            return Ok(city);
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteCities(int id )
        {
            var city = await _context.Cities.FindAsync(id);
            if (city == null) {  return BadRequest(); }
             _context.Cities.Remove(city);
            await _context.SaveChangesAsync();

            return Ok(id);
        }
    } 
}
