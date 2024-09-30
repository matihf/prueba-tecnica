using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    [Index(nameof(Name), IsUnique = true)]
    public class Move
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(20)]
        [Required]
        public string Name { get; set; }

        public int? DefeatId { get; set; }

        [ForeignKey(nameof(DefeatId))]
        [JsonIgnore]
        public Move? Defeat { get; set; }
    }
}
