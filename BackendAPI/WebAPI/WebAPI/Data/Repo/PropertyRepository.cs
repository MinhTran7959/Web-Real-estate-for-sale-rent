﻿using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Data.Repo
{
    public class PropertyRepository : IPropertyRepository
    {
        private readonly DataContext context;

        public PropertyRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<Property> AddPropertiesAsync(Property property)
        {
           await context.properties.AddAsync(property);
            return property;
        }

        public async Task<Property> FindProperties(int PropId)
        {
            return await context.properties.FindAsync(PropId);
        }
        public void DeletePropertiesAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Property>> GetPropertiesAsync(int SellRent)
        {
            var properties= await context.properties
                .Include(x=>x.PropertyType)
                .Include(x=>x.City)
                .Include(x => x.User)
                .Include(x=>x.FurnishingType)
                 .Include(x => x.Photos)
                .Where(x=>x.SellRent == SellRent).ToListAsync();
            return properties;
        }
         public async Task<IEnumerable<Property>> GetMyListPropertiesAsync( string UserName)
        {
            var properties= await context.properties
                .Include(x=>x.PropertyType)
                .Include(x=>x.User)
                .Include(x=>x.City)
                .Include(x=>x.FurnishingType)
                 .Include(x => x.Photos)
                .Where(x=> x.User.Name == UserName)
                .ToListAsync();
            return properties;
        }

        public async Task<Property> GetPropertiesDetailsAsync(int id)
        {
            var properties = await context.properties
               .Include(x => x.PropertyType)
               .Include(x => x.City)
               .Include(x => x.User)
               .Include(x => x.Photos)
               .Include(x => x.FurnishingType)
               .Where(x => x.Id == id).FirstOrDefaultAsync();
            
            return properties;
        }

        public async Task<Property> GetPropertyByIdAsync(int id)
        {
            var properties = await context.properties              
               .Include(x => x.Photos)      
               .Where(x => x.Id == id).FirstOrDefaultAsync();

            return properties;
        }

        public async Task View(int PropId)
        {
            var property = await context.properties.FindAsync(PropId);
             if(property != null)
            {
                property.View += 1;
             
            }    
        }

        public async Task<IEnumerable<Property>> TopView()
        {
           return await context.properties.Include(x => x.PropertyType)
                .Include(x => x.City)
                .Include(x => x.User)
                .Include(x => x.FurnishingType)
                 .Include(x => x.Photos).OrderByDescending(x => x.View).Take(10).ToListAsync();
        }
    }
}
