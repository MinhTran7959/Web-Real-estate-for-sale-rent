using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebAPI.DTOs;
using WebAPI.Errors;
using WebAPI.Extensions;
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
        private readonly IMapper mapper;

        public AccountController(IUnitOfWork uow , IConfiguration configuration , IMapper mapper)
        {
            this.uow = uow;
            this.configuration = configuration;
            this.mapper = mapper;
        }
        [HttpPost("Login")]
        public async Task<IActionResult> Login( LoginReqDto loginReqDto)
        {
            var user= await uow.UsersRepository.authenticate(loginReqDto.Name , loginReqDto.Password);
            ApiError apiError = new ApiError();
            if (user == null)
            {
                apiError.ErrorCode = Unauthorized().StatusCode;
                apiError.ErrorMessage = "Invalid user name or password!!";
                apiError.ErrorDetails = "This error appear when provided name id or password dose not exist";
                return Unauthorized(apiError);
            }

            var loginRes = new LoginResDto();
            loginRes.UserName = user.Name;
            loginRes.Token = CreateJWT(user);
                return Ok(loginRes);
        }

        [HttpPatch("ResetPassword")]
        [Authorize] 
        public async Task<IActionResult> ResetPassword(FormResetDto formReset)
        {
            var user= await uow.UsersRepository.authenticate(formReset.Name, formReset.oldPassword);
            ApiError apiError = new ApiError();
            if (user == null)
            {
                apiError.ErrorCode = Unauthorized().StatusCode;
                apiError.ErrorMessage = "Invalid user name or password!!";
                apiError.ErrorDetails = "This error appear when provided name id or password dose not exist";
                return Unauthorized(apiError);
            }
                 uow.UsersRepository.ResetPassword(user, formReset.newPassword);
                 await uow.SaveAsync();
                 return NoContent();
        }



        [HttpPost("Register")]
        public async Task<IActionResult> Register(LoginReqDto loginReqDto)
        {
            ApiError apiError = new ApiError();
            // use stringExtendsion check null
            if (loginReqDto.Name.IsEmpty() || loginReqDto.Password.IsEmpty() ){
                apiError.ErrorCode = BadRequest().StatusCode;
                apiError.ErrorMessage = "Name or password can not be blank";
                return BadRequest(apiError);
            }
         
            if ( await uow.UsersRepository.UseerAlreadyExist(loginReqDto.Name))
            {
                apiError.ErrorCode = BadRequest().StatusCode;
                apiError.ErrorMessage = "User already exsist, pls!!! try somthing else";
                return BadRequest(apiError);
            }
            uow.UsersRepository.Register(loginReqDto.Name, loginReqDto.Password, loginReqDto.Email, loginReqDto.Phonenumber ,loginReqDto.OtherContactInformation );
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

        [HttpGet("ListAccount")]
        [Authorize]
        public async Task<IActionResult> ListAccount()
        {
            var account = await uow.UsersRepository.ListAccount();

            var accountDto = mapper.Map<IEnumerable<UserDto>>(account);
            return Ok(accountDto);
        }
        [HttpDelete("DeleteAccount")]
        [Authorize]
        public async Task<IActionResult> DeleteAccount(string name, string nameToDelete)
        {
            var isAuthorized = await uow.UsersRepository.CheckNameAsync(name);
            if (!isAuthorized)
            {
                return BadRequest("Unauthorized");
            }

            var userToDelete = await uow.UsersRepository.DeleteAccount(nameToDelete);
            if (userToDelete != null)
            {
                await uow.SaveAsync();
                return StatusCode(201);
            }
            else
            {
                return BadRequest("User not exist");
            }
        }



    }
}
