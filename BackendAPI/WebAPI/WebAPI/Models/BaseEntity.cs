namespace WebAPI.Models
{
    public class BaseEntity
    {
        public int Id { get; set; }
        public DateTime LastUpDateOn { get; set; }= DateTime.Now;
        public int LastUpDateBy { get; set; }

    }
}
