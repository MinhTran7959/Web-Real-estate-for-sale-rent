using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Data;
using WebAPI.DTOs;
using WebAPI.Interfaces;

namespace WebAPI.Controllers
{
   
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
       // [Authorize]
        public async Task< IActionResult> Index( string name)
        {
            var favoritesList = await _uow.favoritesListRepository.GetFavoritesLists(name);
            var favoritesListDto = _mapper.Map<IEnumerable<FavoritesListDto>>(favoritesList);
            return Ok(favoritesListDto);
        }
    }
}
