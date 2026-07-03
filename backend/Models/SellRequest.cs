using System.ComponentModel.DataAnnotations;

namespace CarSellApi.Models
{
    public class SellRequest
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Brand { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Model { get; set; } = string.Empty;

        public int Year { get; set; }

        public int KmDriven { get; set; }

        [MaxLength(50)]
        public string Color { get; set; } = string.Empty;

        [MaxLength(50)]
        public string FuelType { get; set; } = string.Empty;

        [MaxLength(50)]
        public string PreferredDate { get; set; } = string.Empty;

        [MaxLength(50)]
        public string TimeSlot { get; set; } = string.Empty;

        [MaxLength(500)]
        public string Address { get; set; } = string.Empty;

        [MaxLength(50)]
        public string ContactNumber { get; set; } = string.Empty;

        [Required]
        [MaxLength(150)]
        public string FullName { get; set; } = string.Empty;

        [MaxLength(150)]
        public string Email { get; set; } = string.Empty;

        [MaxLength(100)]
        public string City { get; set; } = string.Empty;

        public int? UserId { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
