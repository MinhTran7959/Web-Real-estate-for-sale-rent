using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTOs
{
    public class UserDto
    {
        public string Name { get; set; }
        [Required]
        public string? Email { get; set; }
        public string? Phonenumber { get; set; }
        [MaxLength(300)]
        public string? OtherContactInformation { get; set; }
    }
}
