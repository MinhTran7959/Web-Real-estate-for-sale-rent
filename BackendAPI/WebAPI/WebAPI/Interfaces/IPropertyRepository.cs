using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IPropertyRepository
    {
        Task<IEnumerable<Property>> GetPropertiesAsync(int SellRent);
        Task<Property> GetPropertiesDetailsAsync(int id);
        Task<IEnumerable<Property>> GetMyListPropertiesAsync(string UserName);
        Task<Property> GetPropertyByIdAsync(int id);
        Task<Property> AddPropertiesAsync(Property property);
        void DeletePropertiesAsync(int id);
    }
}
