using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options) { }
        public DbSet<City> Cities { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Property> properties { get; set; }
        public DbSet<PropertyType> propertyTypes { get; set; }
        public DbSet<FurnishingType> furnishingTypes { get; set; }
        public DbSet<FavoritesList> favoritesLists { get; set; }
    }
}
