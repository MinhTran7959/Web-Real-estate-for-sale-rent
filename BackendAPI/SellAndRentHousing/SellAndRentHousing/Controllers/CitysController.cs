using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SellAndRentHousing.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CitysController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<string> GetCity()
        {
            return new string[] { "Atlanta", "New York" };
        }

        [HttpGet("{id}")]
        public string get(int id)
        {
            return  "Atlanta" ;
        }

    } 
}
