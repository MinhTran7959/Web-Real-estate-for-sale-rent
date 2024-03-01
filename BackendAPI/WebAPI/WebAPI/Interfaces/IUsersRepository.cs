using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IUsersRepository
    {
        Task<User> authenticate(string userName, string userPassword);
        void Register(string userName, string userPassword, string email, string phonenumber, string otherContactInformation);
        Task<bool> UseerAlreadyExist(string userName);
      
    }

}
