using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarSellApi.Models
{
    public class FinanceApplication
    {
        [Key]
        public int Id { get; set; }

        public int? CarId { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal LoanAmount { get; set; }

        public int TenureMonths { get; set; } = 36;

        [Required]
        [MaxLength(150)]
        public string FullName { get; set; } = string.Empty;

        [Required]
        [MaxLength(150)]
        public string Email { get; set; } = string.Empty;

        [MaxLength(50)]
        public string Phone { get; set; } = string.Empty;

        [MaxLength(50)]
        public string Status { get; set; } = "Pending Review";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
