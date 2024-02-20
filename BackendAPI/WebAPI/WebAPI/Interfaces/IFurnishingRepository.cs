using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IFurnishingRepository
    {
        Task<IEnumerable<FurnishingType>> GetListFurnishing();
    }
}
