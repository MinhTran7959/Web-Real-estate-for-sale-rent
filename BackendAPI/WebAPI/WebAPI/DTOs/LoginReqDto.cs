using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTOs
{
    public class LoginReqDto
    {
        [Required]
        public string Name { get; set; }
        [Required]

        public string Password { get; set; }
    }
}
