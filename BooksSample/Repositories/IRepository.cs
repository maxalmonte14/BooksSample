using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BooksSample.Repositories
{
    public interface IRepository<T>
    {
        public Task<T> AddAsync(T entity);

        public Task DeleteAsync(Guid id);

        public bool Exists(Guid id);

        public Task<IList<T>> FindAllAsync();

        public Task<T> FindByIdAsync(Guid id);

        public Task<T> UpdateAsync(T entity);
    }
}
