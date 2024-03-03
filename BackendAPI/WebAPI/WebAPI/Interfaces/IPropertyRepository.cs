using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IPropertyRepository
    {
        Task<IEnumerable<Property>> GetPropertiesAsync(int SellRent);
        Task<IEnumerable<Property>> TopView();
        Task<Property> GetPropertiesDetailsAsync(int id);
        Task View(int PropId);
        Task<IEnumerable<Property>> GetMyListPropertiesAsync(string UserName);
        Task<Property> GetPropertyByIdAsync(int id);
        Task<Property> FindProperties(int id);
        Task<Property> AddPropertiesAsync(Property property);
        void DeletePropertiesAsync(int id);
    }
}
