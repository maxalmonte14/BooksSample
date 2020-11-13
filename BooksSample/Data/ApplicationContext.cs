using BooksSample.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace BooksSample.Data
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Book> Books { get; set; }
        public DbSet<Author> Authors { get; set; }
        public ApplicationContext(DbContextOptions options) : base(options)
        {
        }
    }
}
