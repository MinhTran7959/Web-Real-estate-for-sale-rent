using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IFavoritesListRepository
    {
        Task<IEnumerable<FavoritesList>>GetFavoritesLists(string name);
        Task<FavoritesList> AddFavoritesLists(string name, int proID);
        Task<FavoritesList> DeleteFavoritesLists(int FavId);

    }
}
