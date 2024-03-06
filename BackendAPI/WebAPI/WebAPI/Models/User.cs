using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class User : BaseEntity
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string? Email { get; set; }
        public string? Phonenumber { get; set; }
        [MaxLength(300)]
        public string? OtherContactInformation { get; set; }

        public byte[] Password { get; set; }

        public byte[] PasswordKey { get; set; }
        public virtual ICollection<Property> PropertyList { get; set; } = new List<Property>();
    }
}
