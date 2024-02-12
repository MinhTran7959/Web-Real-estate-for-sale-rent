namespace WebAPI.Models
{
    public class City
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public DateTime LastUpdate { get; set; }
        public int LastUpdateBy { get; set; }

    }
}
