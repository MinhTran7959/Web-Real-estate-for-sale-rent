using System.Threading.Tasks;
namespace WebAPI.Interfaces;

public interface IUnitOfWork
{
    ICityRepository cityRepository { get; }
    IUsersRepository UsersRepository { get; }
    Task<bool> SaveAsync();
}
