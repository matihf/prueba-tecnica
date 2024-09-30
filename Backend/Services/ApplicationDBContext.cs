using Backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace Backend.Services
{
    public class ApplicationDBContext : DbContext

    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Move>()
                    .HasOne(e => e.Defeat)
                    .WithOne()
                    .OnDelete(DeleteBehavior.ClientSetNull);

            base.OnModelCreating(modelBuilder);
            LoadData(modelBuilder);
        }

        private void LoadData(ModelBuilder modelBuilder)
        {
            var rock = new Move { Id = 1, Name = "Rock" };
            var paper = new Move { Id = 2, Name = "Paper" };
            var scissors = new Move { Id = 3, Name = "Scissors" };

            modelBuilder.Entity<Move>().HasData(rock);
            modelBuilder.Entity<Move>().HasData(paper);
            modelBuilder.Entity<Move>().HasData(scissors);
        }

        public DbSet<Player> Players { get; set; }

        public DbSet<Move> Moves { get; set; }

    }
}
