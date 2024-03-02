using Microsoft.EntityFrameworkCore;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Data.Repo
{
    public class PropertyTypeRepository : IPropertyTypeRepository
    {
        private readonly DataContext context;

        public PropertyTypeRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<PropertyType> AddCPropertyAsync(PropertyType propertyType)
        {
            await context.AddAsync(propertyType);
            return propertyType;
        }

        public async Task<PropertyType> DeletePropertyAsync(int id)
        {
            var propertyType = await context.propertyTypes.FirstOrDefaultAsync(x => x.Id == id);
            if (propertyType != null)
            {
                context.Remove(propertyType);
                context.SaveChanges();
            }

            return propertyType;
        }

        public Task<PropertyType> FindProperty(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<PropertyType> GetByIdProperty(int id)
        {
            var PropertyType = await context.propertyTypes.FirstOrDefaultAsync(x => x.Id == id);
            return PropertyType;
        }

        public async Task<IEnumerable<PropertyType>> GetPropertyTypeAsync()
        {
            return await context.propertyTypes.ToListAsync();
        }
    }
}
