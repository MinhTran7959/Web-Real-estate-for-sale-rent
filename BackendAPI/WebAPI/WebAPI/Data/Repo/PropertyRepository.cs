using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Data.Repo
{
    public class PropertyRepository : IPropertyRepository
    {
        private readonly DataContext context;

        public PropertyRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<Property> AddPropertiesAsync(Property property)
        {
           await context.properties.AddAsync(property);
            return property;
        }

        public void DeletePropertiesAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Property>> GetPropertiesAsync(int SellRent)
        {
            var properties= await context.properties
                .Include(x=>x.PropertyType)
                .Include(x=>x.City)
                .Include(x=>x.FurnishingType)
                
                .Where(x=>x.SellRent == SellRent).ToListAsync();
            return properties;
        }

        public async Task<Property> GetPropertiesDetailsAsync(int id)
        {
            var properties = await context.properties
               .Include(x => x.PropertyType)
               .Include(x => x.City)
               .Include(x => x.FurnishingType)
               .Where(x => x.Id == id).FirstOrDefaultAsync();
            
            return properties;
        }
    }
}
