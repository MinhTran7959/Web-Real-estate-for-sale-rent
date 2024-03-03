using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IPropertyTypeRepository
    {
        Task<IEnumerable<PropertyType>> GetPropertyTypeAsync();
        Task<PropertyType> AddCPropertyAsync(PropertyType propertyType);
        Task<PropertyType> FindProperty(int id);
        Task<PropertyType> DeletePropertyAsync(int id);
        Task<PropertyType> GetByIdProperty(int id);
    }
}
