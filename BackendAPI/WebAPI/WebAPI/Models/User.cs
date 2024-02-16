﻿using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]

        public byte[] Password { get; set; }
        public byte[] PasswordKey { get; set; }
    }
}
