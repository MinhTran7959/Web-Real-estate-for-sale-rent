using System.Threading.Tasks;
namespace WebAPI.Interfaces;

public interface IUnitOfWork
{
    ICityRepository cityRepository { get; }
    IUsersRepository UsersRepository { get; }
    IPropertyRepository PropertyRepository { get; }
    IPropertyTypeRepository propertyTypeRepository { get; }
    IFurnishingRepository furnishingRepository { get; }
    Task<bool> SaveAsync();
}
