using WebAPI.Data.Repo;
using WebAPI.Interfaces;

namespace WebAPI.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private DataContext context;

    

        public UnitOfWork(DataContext context) {
            this.context= context;
        }

        public ICityRepository cityRepository => new CityRepository(context);

        public IUsersRepository UsersRepository => new UsersRepository(context);
      
        public IPropertyTypeRepository propertyTypeRepository => new PropertyTypeRepository(context);
        public IFurnishingRepository furnishingRepository => new FurnishingRepository(context);
        public IPropertyRepository PropertyRepository => new PropertyRepository(context);
        public IFavoritesListRepository favoritesListRepository => new FavoritesListReporitory(context);

        public async Task<bool> SaveAsync()
        {
            return await this.context.SaveChangesAsync()>0  ; 
        }
    }
}
