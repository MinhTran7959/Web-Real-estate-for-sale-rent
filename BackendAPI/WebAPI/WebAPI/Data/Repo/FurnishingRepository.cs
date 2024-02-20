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

        public async Task<IEnumerable<FurnishingType>> GetListFurnishing()
        {
            return await context.furnishingTypes.ToListAsync();
        }
    }
}
