using BooksSample.Data;
using BooksSample.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BooksSample.Repositories
{
    public class BookRepository : IBookRepository
    {
        private readonly ApplicationContext _context;
        public BookRepository(ApplicationContext applicationContext)
        {
            _context = applicationContext;
        }

        public async Task<Book> AddAsync(Book entity)
        {
            await _context.Books.AddAsync(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task DeleteAsync(Guid id)
        {
            var book = new Book { Id = id };

            _context.Books.Attach(book);
            _context.Books.Remove(book);

            await _context.SaveChangesAsync();
        }

        public bool Exists(Guid id)
        {
            return _context.Books.AsNoTracking().Count(b => b.Id == id) > 0;
        }

        public async Task<IList<Book>> FindAllAsync()
        {
            return await _context.Books.ToListAsync();
        }

        public async Task<IList<Book>> FindByAuthorIdAsync(Guid id)
        {
            return await _context.Books.Where(b => b.AuthorId == id).ToListAsync();
        }

        public async Task<Book> FindByIdAsync(Guid id)
        {
            return await _context.Books.SingleOrDefaultAsync(b => b.Id == id);
        }

        public async Task<Book> UpdateAsync(Book book)
        {
            await _context.SaveChangesAsync();

            return book;
        }
    }
}
