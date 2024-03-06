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
                
               .Where(x =>x.IdProperty == x.PropertyList.Id && x.LastUpdatedBy == user.Id)
              
               .ToListAsync();
        }


        public async Task<FavoritesList> AddFavoritesLists(string name, int proID)
        {
            var favoritesList = new FavoritesList();
            var user = await context.Users.FirstOrDefaultAsync(u => u.Name == name);
            if (user == null) return null;
            favoritesList.IdProperty = proID;
            favoritesList.LastUpdatedOn = DateTime.Now;
            favoritesList.LastUpdatedBy = user.Id;

            await context.favoritesLists.AddAsync(favoritesList);
            return favoritesList;
        }
        public async Task<FavoritesList> DeleteFavoritesLists(int FavId)
        {
           
           
            var favoritesList = await context.favoritesLists.FirstOrDefaultAsync(x=>x.Id == FavId);
            if (favoritesList == null) return null;
             context.favoritesLists.Remove(favoritesList);
            return favoritesList;
        }

    }
}

