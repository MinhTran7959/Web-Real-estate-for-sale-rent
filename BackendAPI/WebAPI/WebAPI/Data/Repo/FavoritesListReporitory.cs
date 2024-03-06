using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Data.Repo
{
    public class FavoritesListReporitory : IFavoritesListRepository
    {
        private readonly DataContext context;

        public FavoritesListReporitory(DataContext context)
        {
            this.context = context;
        }
        public async Task<IEnumerable<FavoritesList>> GetFavoritesLists(string name)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.Name == name);
            if (user == null) return Enumerable.Empty<FavoritesList>();

            return await context.favoritesLists
                .Include(x => x.PropertyList)
                .Include(x => x.PropertyList!.User)
                .Include(x => x.PropertyList!.Photos)
                .Include(x => x.PropertyList!.PropertyType)
                .Include(x => x.PropertyList!.FurnishingType)
                .Include(x => x.PropertyList!.City)
                
               .Where(x =>x.PropertyList!.User!.Name == name)
              
               .ToListAsync();
        }
    }
}
