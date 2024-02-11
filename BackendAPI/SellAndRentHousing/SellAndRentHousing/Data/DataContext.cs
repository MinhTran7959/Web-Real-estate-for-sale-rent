using Microsoft.EntityFrameworkCore;
using SellAndRentHousing.Models;

namespace SellAndRentHousing.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options) { }
        public DbSet<City> Cities { get; set; }
    }
}
