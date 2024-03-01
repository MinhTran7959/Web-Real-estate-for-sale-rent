using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IFurnishingRepository
    {
        Task<IEnumerable<FurnishingType>> GetListFurnishing();
        Task<FurnishingType> AddCFurnishingAsync(FurnishingType furnishingType);
        Task<FurnishingType> FindFurnishing(int id);
        Task<FurnishingType> DeleteFurnishingAsync(int id);
        Task<FurnishingType> GetByIdFurnishing(int id);
    }
}
