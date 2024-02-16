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
        public async Task<bool> SaveAsync()
        {
            return await this.context.SaveChangesAsync()>0  ; 
        }
    }
}
