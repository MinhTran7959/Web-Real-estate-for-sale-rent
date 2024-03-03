using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTOs
{
    public class FormResetDto
    {
        public string Name { get; set; }

        public string oldPassword { get; set; }

        public string newPassword { get; set; }
    }
}
