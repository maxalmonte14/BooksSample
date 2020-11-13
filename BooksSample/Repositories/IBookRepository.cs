using BooksSample.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BooksSample.Repositories
{
    public interface IBookRepository : IRepository<Book>
    {
        public Task<IList<Book>> FindByAuthorIdAsync(Guid id);
    }
}
