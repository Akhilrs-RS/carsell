using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarSellApi.Models
{
    public class Customer
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(150)]
        public string FullName { get; set; } = string.Empty;

        [Required]
        [MaxLength(150)]
        public string Email { get; set; } = string.Empty;

        [MaxLength(50)]
        public string Phone { get; set; } = string.Empty;

        [MaxLength(500)]
        public string Address { get; set; } = string.Empty;

        public string PurchaseHistory { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class Dealer
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(150)]
        public string BusinessName { get; set; } = string.Empty;

        [Required]
        [MaxLength(150)]
        public string Email { get; set; } = string.Empty;

        [MaxLength(50)]
        public string Phone { get; set; } = string.Empty;

        [MaxLength(50)]
        public string VerificationStatus { get; set; } = "Pending Review"; // Pending, Approved, Rejected

        public string Documents { get; set; } = string.Empty; // JSON/comma list of files

        [MaxLength(150)]
        public string ContactPerson { get; set; } = string.Empty;

        [MaxLength(100)]
        public string City { get; set; } = string.Empty;

        [MaxLength(50)]
        public string GstNumber { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class PurchaseOrder
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(150)]
        public string VendorName { get; set; } = string.Empty;

        [Required]
        public string VehicleDetails { get; set; } = string.Empty;

        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        [MaxLength(50)]
        public string Status { get; set; } = "Draft"; // Draft, Approved, Received, Cancelled

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class Invoice
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string ReferenceNumber { get; set; } = string.Empty;

        [MaxLength(50)]
        public string Type { get; set; } = "Sales"; // Sales, Purchase

        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal TaxAmount { get; set; } // GST

        public DateTime Date { get; set; } = DateTime.UtcNow;

        [MaxLength(50)]
        public string PaymentStatus { get; set; } = "Unpaid"; // Unpaid, Paid, Partially Paid
    }

    public class Account
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Code { get; set; } = string.Empty;

        [Required]
        [MaxLength(150)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(50)]
        public string Type { get; set; } = "Asset"; // Asset, Liability, Equity, Revenue, Expense

        [Column(TypeName = "decimal(18,2)")]
        public decimal Balance { get; set; }
    }

    public class JournalEntry
    {
        [Key]
        public int Id { get; set; }

        public int AccountId { get; set; }

        [MaxLength(50)]
        public string Type { get; set; } = "Debit"; // Debit, Credit

        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        [MaxLength(500)]
        public string Description { get; set; } = string.Empty;

        public DateTime Date { get; set; } = DateTime.UtcNow;
    }

    public class Employee
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(150)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Department { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Position { get; set; } = string.Empty;

        [Column(TypeName = "decimal(18,2)")]
        public decimal Salary { get; set; }

        [MaxLength(50)]
        public string Status { get; set; } = "Active"; // Active, Terminated, On Leave

        public DateTime DateHired { get; set; } = DateTime.UtcNow;
    }

    public class ServiceBooking
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(150)]
        public string CustomerName { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        public string VehicleDetails { get; set; } = string.Empty;

        [MaxLength(150)]
        public string ServiceType { get; set; } = "General Maintenance";

        [MaxLength(100)]
        public string AssignedMechanic { get; set; } = "Unassigned";

        [MaxLength(50)]
        public string Status { get; set; } = "Scheduled"; // Scheduled, In Progress, QC, Completed

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class JobCard
    {
        [Key]
        public int Id { get; set; }

        public int ServiceBookingId { get; set; }

        public string Description { get; set; } = string.Empty;

        public string SparePartsUsed { get; set; } = string.Empty;

        [Column(TypeName = "decimal(18,2)")]
        public decimal LaborCost { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal SparePartsCost { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalCost { get; set; }

        [MaxLength(50)]
        public string Status { get; set; } = "Open"; // Open, Closed
    }
}
