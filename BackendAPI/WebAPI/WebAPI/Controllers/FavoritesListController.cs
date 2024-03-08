using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Migrations;
using WebAPI.Data;
using WebAPI.DTOs;
using WebAPI.Interfaces;

namespace WebAPI.Controllers
{
    [Authorize]
    public class FavoritesListController : BaseController
    {
       
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _uow;
        
     
        public FavoritesListController(IUnitOfWork uow ,IMapper mapper  )
        {
            _mapper = mapper;
            _uow = uow;
        }
        [HttpGet("FacvoritesList/{name}")]
  
        public async Task< IActionResult> Index( string name)
        {
            var favoritesList = await _uow.favoritesListRepository.GetFavoritesLists(name);
            var favoritesListDto = _mapper.Map<IEnumerable<FavoritesListDto>>(favoritesList);
            return Ok(favoritesListDto);
        }

        [HttpPost("AddFacvoritesList/{name}/{proID}")]
        
        public async Task<IActionResult> AddFacvoritesList(string name, int proID)
        {
            var favoritesList = await _uow.favoritesListRepository.AddFavoritesLists(name, proID);
            if (favoritesList != null)
            {
                await _uow.SaveAsync();
                return StatusCode(201);
            }

            else
            {
                return BadRequest("Failed to add property to favorites list.");
            }
        }
        [HttpDelete("DeleteFacvoritesList/{FavId}")]
        public async Task<IActionResult> DeleteFacvoritesList(int FavId)
        {
            var favoritesList = await _uow.favoritesListRepository.DeleteFavoritesLists(FavId);
            if (favoritesList != null)
            {
                await _uow.SaveAsync();
                return StatusCode(201);
            }

            else
            {
                return BadRequest("Failed to add property to favorites list.");
            }
        }
    }
}
