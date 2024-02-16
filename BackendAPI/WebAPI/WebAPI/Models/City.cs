using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class City
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required] 
        public string Country { get; set; }
        public DateTime LastUpdate { get; set; }
        public int LastUpdateBy { get; set; }

    }
}
