using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface ICityRepository
    {
        Task<IEnumerable<City>> GetCitiesAsync();
        Task<City> AddCitiesAsync(City city);
        Task<City> FindCity(int CityId);
        Task<City> DeleteCitiesAsync(int CityId);
        Task<City> GetByIdCity(int CityId);
       
    }
}
    