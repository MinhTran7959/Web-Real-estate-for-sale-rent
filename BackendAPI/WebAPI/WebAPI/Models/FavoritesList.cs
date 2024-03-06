using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class FavoritesList:BaseEntity
    {

        [ForeignKey("IdProperty")]
        //public int? IdProperty { get; set; }
        public virtual Property? PropertyList { get; set; }
    }
}
