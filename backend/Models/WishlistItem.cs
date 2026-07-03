using System.ComponentModel.DataAnnotations;

namespace CarSellApi.Models
{
    public class WishlistItem
    {
        [Key]
        public int Id { get; set; }

        public int UserId { get; set; }

        public int CarId { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
