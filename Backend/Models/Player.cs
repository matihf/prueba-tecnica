using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Player
    {
        [Key]
        [MaxLength(20)]
        public string Name { get; set; }

        [DefaultValue(0)]
        public int Victories { get; set; }
    }
}
