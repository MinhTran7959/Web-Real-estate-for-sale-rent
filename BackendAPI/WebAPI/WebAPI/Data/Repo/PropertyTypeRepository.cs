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

        public async Task<IEnumerable<PropertyType>> GetPropertyTypeAsync()
        {
            return await context.propertyTypes.ToListAsync();
        }
    }
}
