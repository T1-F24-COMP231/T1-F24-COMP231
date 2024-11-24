﻿using System.ComponentModel.DataAnnotations;

namespace WebBuilderAPI.RequestModels
{
    public class LoginRequestModel
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}