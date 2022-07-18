using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Core.Entity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUserAsync(UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any()){
                var user = new AppUser
                {
                    DisplayName = "Test",
                    Email = "test@gmail.com",
                    UserName = "test@gmail.com",
                    Address = new Address
                    {
                        FirstName = "Test",
                        LastName = "User",
                        Street = "x xxx xxxx",
                        City = "Hyd",
                        State = "TS",
                        ZipCode = "908900"
                    }
                };

                await userManager.CreateAsync(user, "Test@123$");
            }
        }
    }
}