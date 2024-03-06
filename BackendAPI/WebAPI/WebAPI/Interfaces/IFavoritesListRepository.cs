using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IFavoritesListRepository
    {
        Task<IEnumerable<FavoritesList>>GetFavoritesLists(string name);
    }
}
