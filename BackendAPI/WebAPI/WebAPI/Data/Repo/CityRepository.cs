﻿using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Data.Repo
{
    public class CityRepository : ICityRepository
    {
        private readonly DataContext context;

        public CityRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<City> AddCitiesAsync(City city) 
        {
            await context.AddAsync(city);          
            return city;
        }

        public async Task<City> DeleteCitiesAsync(int CityId)
        {
            var city= await context.Cities.FindAsync(CityId);
            if (city != null)
            {
                context.Remove(city);
            }
            return city;
        }

        public async Task<City> GetByIdCity(int CityId)
        {
            var city = await context.Cities.FindAsync(CityId);         
            return city;
        }

        public async Task<IEnumerable<City>> GetCitiesAsync()
        {
            var listCity = await context.Cities.ToListAsync();
            return listCity;
        }

        
    }
}
