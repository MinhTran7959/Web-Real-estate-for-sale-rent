using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTOs
{
    public class PropertyDetailsDTO: PropertyListDTO
    {
        public int CarpetArea { get; set; }
        public string Address { get; set; }
        public string Address2 { get; set; }
        public int FloorNo { get; set; }
        public int TotalFloors { get; set; }
        public string MainEntrance { get; set; }
        public int Security { get; set; }
        public bool Gated { get; set; }
        public int Maintenance { get; set; }
        public int Age { get; set; }
        public string Description { get; set; }
        public string PostByName { get; set; }
     
        public string? Email { get; set; }
        public string? Phonenumber { get; set; }
        [MaxLength(300)]
        public string? OtherContactInformation { get; set; }
        public ICollection<PhotoDTO> Photos { get; set; }
    }
}