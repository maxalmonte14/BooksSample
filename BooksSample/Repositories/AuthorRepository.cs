using BooksSample.Data;
using BooksSample.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BooksSample.Repositories
{
    public class AuthorRepository : IAuthorRepository
    {
        private readonly ApplicationContext _context;

        public AuthorRepository(ApplicationContext context)
        {
            _context = context;
        }

        public async Task<Author> AddAsync(Author author)
        {
            await _context.Authors.AddAsync(author);
            await _context.SaveChangesAsync();

            return author;
        }

        public async Task DeleteAsync(Guid id)
        {
            var author = new Author { Id = id };

            _context.Authors.Attach(author);
            _context.Authors.Remove(author);

            await _context.SaveChangesAsync();
        }

        public bool Exists(Guid id)
        {
            return _context.Authors.AsNoTracking().Count(a => a.Id == id) > 0;
        }

        public async Task<IList<Author>> FindAllAsync()
        {
            return await _context.Authors.ToListAsync();
        }

        public async Task<Author> FindByIdAsync(Guid id)
        {
            return await _context.Authors.SingleOrDefaultAsync(a => a.Id == id);
        }

        public async Task<Author> UpdateAsync(Author author)
        {
            await _context.SaveChangesAsync();

            return author;
        }
    }
}
