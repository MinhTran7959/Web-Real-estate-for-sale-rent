using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTOs
{
    public class LoginReqDto
    {
        [Required]
        public string Name { get; set; }
        [Required]

        public string Password { get; set; }
        public string? Email { get; set; }
        public string? Phonenumber { get; set; }
        [MaxLength(300)]
        public string? OtherContactInformation { get; set; }
    }
}
