using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebAPI.DTOs;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    public class AccountController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IConfiguration configuration;

        public AccountController(IUnitOfWork uow , IConfiguration configuration)
        {
            this.uow = uow;
            this.configuration = configuration;
        }
        [HttpPost("Login")]
        public async Task<IActionResult> Login( LoginReqDto loginReqDto)
        {
            var user= await uow.UsersRepository.authenticate(loginReqDto.Name , loginReqDto.Password);

            if (user == null)
            {
                return Unauthorized();
            }

            var loginRes = new LoginResDto();
            loginRes.UserName = user.Name;
            loginRes.Token = CreateJWT(user);
                return Ok(loginRes);
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(LoginReqDto loginReqDto)
        {
            if ( await uow.UsersRepository.UseerAlreadyExist(loginReqDto.Name))
            {
                return BadRequest("User already exsist, pls!!! try somthing else");
            }
            uow.UsersRepository.Register(loginReqDto.Name, loginReqDto.Password);
            await uow.SaveAsync();
            return StatusCode(201);
        }

        private string CreateJWT(User user)
        {
            var secretKey = configuration.GetSection("AppSettings:Key").Value;

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var claims = new Claim[]
            {
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };

            var signingCredential = new SigningCredentials(
                key, SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = signingCredential
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);

        }

    }
}
