using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]

    public class PropertyController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        private readonly IPhotoService photoService;

        public PropertyController(IUnitOfWork uow, IMapper mapper, IPhotoService photoService)
        {
            this.uow = uow;
            this.mapper = mapper;
            this.photoService = photoService;
        }
        [HttpGet("list/{SellRent}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPropertyList(int SellRent)
        {
            var properties = await uow.PropertyRepository.GetPropertiesAsync(SellRent);
            var propertiesDTO = mapper.Map<IEnumerable<PropertyListDTO>>(properties);
            return Ok(propertiesDTO);
        }

        [HttpGet("Details/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPropertyDetails(int id)
        {
            var property = await uow.PropertyRepository.GetPropertiesDetailsAsync(id);
            var propertyDTO = mapper.Map<PropertyDetailsDTO>(property);
            return Ok(propertyDTO);
        }
        [HttpGet("DetailsUpdate/{id}")]
        [Authorize]
        public async Task<IActionResult> GetPropertyDetailsUpdate(int id)
        {
            var property = await uow.PropertyRepository.GetPropertiesDetailsAsync(id);
            var propertyDTO = mapper.Map<PropertyDetailsUpdateDTO>(property);
            return Ok(propertyDTO);
        }

        [HttpGet("MyProperty/{UserName}")]
        [Authorize]
        public async Task<IActionResult> GetMyPropertiesAsync(string UserName)
        {
            var property = await uow.PropertyRepository.GetMyListPropertiesAsync(UserName);
            var propertyDTO = mapper.Map<IEnumerable<PropertyListDTO>>(property);
            return Ok(propertyDTO);
        }
        [HttpPost("Add")]
        [Authorize]
        public async Task<IActionResult> AddProperty(PropertyDTO propertyDTO)
        {
            var property = mapper.Map<Property>(propertyDTO);
            var userId = GetUserId();
            property.PostedBy = userId;
            property.LastUpdatedBy = userId;
            await uow.PropertyRepository.AddPropertiesAsync(property);
            await uow.SaveAsync();
            return StatusCode(201);


        }
        [HttpPost("Add/photo/{propid}")]
        [Authorize]
        public async Task<ActionResult<PhotoDTO>> AddPropertyPhoto(IFormFile file, int propid)
        {
            var result = await photoService.UploadPhotoAsync(file);
            if (result.Error != null)
                return BadRequest(result.Error.Message);
            var userId = GetUserId();

            var property = await uow.PropertyRepository.GetPropertyByIdAsync(propid);

            if (property.PostedBy != userId)
                return BadRequest("You are not authorised to upload photo for this property");

            var photo = new Photo
            {
                ImageUrl = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };
            if (property.Photos.Count == 0)
            {
                photo.IsPrimary = true;
            }

            property.Photos.Add(photo);
            //await uow.SaveAsync();
            if (await uow.SaveAsync())
            { return mapper.Map<PhotoDTO>(photo); }
            else
            {
                return BadRequest("Some problem occured in uploading photo..");
            }

            //return Ok(201);
        }


        [HttpPost("set-primary-photo/{propId}/{photoPublicId}")]
        [Authorize]
        public async Task<IActionResult> SetPrimaryPhoto(int propId, string photoPublicId)
        {
            var userId = GetUserId();

            var property = await uow.PropertyRepository.GetPropertyByIdAsync(propId);



            if (property.PostedBy != userId)
                return BadRequest("You are not authorised to change the photo");
            if (property == null || property.PostedBy != userId)
                return BadRequest("No such property or photo exists");


            var photo = property.Photos.FirstOrDefault(p => p.PublicId == photoPublicId);

            if (photo == null)
                return BadRequest("No such property or photo exists");

            if (photo.IsPrimary)
                return BadRequest("This is already a primary photo");


            var currentPrimary = property.Photos.FirstOrDefault(p => p.IsPrimary);
            if (currentPrimary != null) currentPrimary.IsPrimary = false;
            photo.IsPrimary = true;

            if (await uow.SaveAsync()) return NoContent();

            return BadRequest("Failed to set primary photo");
        }
        [HttpDelete("delete-photo/{propId}/{photoPublicId}")]
        [Authorize]
        public async Task<IActionResult> DeletePhoto(int propId, string photoPublicId)
        {
            var userId = GetUserId();

            var property = await uow.PropertyRepository.GetPropertyByIdAsync(propId);

            if (property == null || property.PostedBy != userId)
                return BadRequest("No such property or photo exists");

            if (property.PostedBy != userId)
                return BadRequest("You are not authorised to delete the photo");



            var photo = property.Photos.FirstOrDefault(p => p.PublicId == photoPublicId);

            if (photo == null)
                return BadRequest("No such property or photo exists");

            if (photo.IsPrimary)
                return BadRequest("You can not delete primary photo");

            if (photo.PublicId != null)
            {
                var result = await photoService.DeletePhotoAsync(photo.PublicId);
                if (result.Error != null) return BadRequest(result.Error.Message);
            }

            property.Photos.Remove(photo);

            if (await uow.SaveAsync()) return Ok();

            return BadRequest("Failed to delete photo");
        }
        [HttpPut("Update/{id}")]
        public async Task<IActionResult> UpdateProperty(int id, PropertyDTO propertyDTO)
        {
            try
            {

                var propertyFromDB = await uow.PropertyRepository.FindProperties(id);
                if (propertyFromDB == null)
                {
                    return BadRequest("Update error occured");
                }
                else
                {
                    //cityFromDB.LastUpDateon = DateTime.Now;
                    // cityFromDB.LastUpdateBy = 1;
                    mapper.Map(propertyDTO, propertyFromDB);

                    await uow.SaveAsync();
                    return StatusCode(200);
                }
            }
            catch
            {
                return StatusCode(500, "Some unknown error occured");
            }
        }
    }
}
