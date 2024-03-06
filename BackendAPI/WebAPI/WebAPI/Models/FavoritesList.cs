using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class FavoritesList:BaseEntity
    {
        public int? IdProperty { get; set; }

        [ForeignKey("IdProperty")]
        public virtual Property? PropertyList { get; set; }
    }
}
//[ForeignKey("IdProperty")]