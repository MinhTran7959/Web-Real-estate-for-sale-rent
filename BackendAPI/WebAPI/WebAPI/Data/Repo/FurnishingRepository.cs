using Microsoft.EntityFrameworkCore;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Data.Repo
{
    public class FurnishingRepository:IFurnishingRepository
    {
        private readonly DataContext context;

        public FurnishingRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<FurnishingType> AddCFurnishingAsync(FurnishingType furnishingType)
        {
            await context.AddAsync(furnishingType);
            return furnishingType;
        }

        public async Task<FurnishingType> DeleteFurnishingAsync(int id)
        {
            var city = await context.furnishingTypes.FirstOrDefaultAsync(x => x.Id == id);
            if (city != null)
            {
                context.Remove(city);
                context.SaveChanges();
            }
          
            return city;
        }

        public async Task<FurnishingType> FindFurnishing(int id)
        {
            var furn = await context.furnishingTypes.FirstOrDefaultAsync(x=>x.Id == id);
            return(furn);
        }

        public async Task<FurnishingType> GetByIdFurnishing(int id)
        {
            var furn = await context.furnishingTypes.FirstOrDefaultAsync(x => x.Id == id);
            return furn;
        }

        public async Task<IEnumerable<FurnishingType>> GetListFurnishing()
        {
            return await context.furnishingTypes.ToListAsync();
        }
    }
}
