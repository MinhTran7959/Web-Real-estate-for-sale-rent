using CloudinaryDotNet;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Data.Repo
{
    public class UsersRepository : IUsersRepository
    {
        private readonly DataContext context;

        public UsersRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<User> authenticate(string Name, string PasswordText)
        {
            var user = await context.Users.FirstOrDefaultAsync(x => x.Name == Name);
            if (user == null || user.PasswordKey == null)
            {
                return null;
            }

            if(!MatchPasswordHash(PasswordText, user.Password , user.PasswordKey))
            {
                return null;
            }
            return user;
        }

        private bool MatchPasswordHash(string passwordText, byte[] password, byte[] passwordKey)
        {
            using (var hmac = new HMACSHA512(passwordKey))
            {
               
               var passWordhash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(passwordText));
                for (int i = 0; i < passWordhash.Length; i++)
                {
                    if (passWordhash[i] != password[i])
                    {
                        return false;
                    }
                }
                return true;
            }
        }

        public void Register(string userName, string userPassword, string email, string phonenumber, string otherContactInformation)
        {
            byte[] passWordhash, passwordKey;
            using ( var hmac = new HMACSHA512())
            {
                passwordKey = hmac.Key;
                passWordhash= hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(userPassword));

            }

            User user = new User();
            user.Name = userName;
            user.Password = passWordhash;
            user.PasswordKey = passwordKey;
            user.OtherContactInformation = otherContactInformation; 
            user.Phonenumber = phonenumber;
            user.Email = email;
            context.Users.Add(user);
        }

        public async Task<bool> UseerAlreadyExist(string userName)
        {
            return await context.Users.AnyAsync(x=>x.Name == userName);
        }

        public async Task<IEnumerable<User>> ListAccount()
        {
           return await context.Users.ToListAsync();
        }


       public void ResetPassword(User user, string newPassWord)
        {
            byte[] passWordhash, passwordKey;
            using (var hmac = new HMACSHA512())
            {
                passwordKey = hmac.Key;
                passWordhash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(newPassWord));

            }
            user.Password = passWordhash;
            user.PasswordKey = passwordKey;
           
            
        }

        public async Task<User> DeleteAccount(string name)
        {
            var userToDelete = await context.Users.FirstOrDefaultAsync(x => x.Name == name);
            if (userToDelete != null)
            {
                context.Users.Remove(userToDelete);
            }
            return userToDelete;
        }


        public async Task<bool> CheckNameAsync(string name)
        {
            var user = await context.Users.FirstOrDefaultAsync(x => x.Name == name && name == "Admin");
            return user != null; // Trả về true nếu user tồn tại, ngược lại trả về false
        }



    }
}
