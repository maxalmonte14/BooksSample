using BooksSample.Data.ApiModels;
using BooksSample.Data.Entities;
using BooksSample.Repositories;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BooksSample.Controllers
{
    [ApiController]
    [EnableCors("CorsApi")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public class BooksController : ControllerBase
    {
        private readonly IBookRepository _bookRepository;
        private readonly IAuthorRepository _authorRepository;

        public BooksController(IBookRepository repository, IAuthorRepository authorRepository)
        {
            _bookRepository = repository;
            _authorRepository = authorRepository;
        }

        [HttpGet("/api/[controller]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IList<BookApiModel>>> GetAll()
        {
            var books = await _bookRepository.FindAllAsync();
            var models = (from book
                            in books
                            select
                            BookToApiModel(book))
                            .ToList();

            return Ok(models);
        }

        [HttpGet("/api/[controller]/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Book>> Get(Guid id)
        {
            var book = await _bookRepository.FindByIdAsync(id);

            if (book == null)
            {
                return NotFound();
            }

            return Ok(BookToApiModel(book));
        }

        [HttpPost("/api/[controller]")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Book>> Create([FromBody] Book book)
        {
            if (!_authorRepository.Exists(book.AuthorId))
            {
                return BadRequest();
            }

            var newBook = await _bookRepository.AddAsync(book);

            return CreatedAtAction(nameof(Create), BookToApiModel(newBook));
        }

        [HttpDelete("/api/[controller]/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Delete(Guid id)
        {
            if (!_bookRepository.Exists(id))
            {
                return NotFound();
            }

            await _bookRepository.DeleteAsync(id);

            return NoContent();
        }

        [HttpPut("/api/[controller]/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Update(Guid id, [FromBody] Book book)
        {
            var bookFromDb = await _bookRepository.FindByIdAsync(id);

            if (bookFromDb == null)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            bookFromDb.Name = book.Name;
            bookFromDb.Year = book.Year;
            bookFromDb.PagesCount = book.PagesCount;
            bookFromDb.AuthorId = book.AuthorId;

            var updatedBook = await _bookRepository.UpdateAsync(bookFromDb);

            return Ok(BookToApiModel(updatedBook));
        }

        private BookApiModel BookToApiModel(Book book)
        {
            return new BookApiModel
            {
                Id = book.Id,
                Title = book.Name,
                AuthorId = book.AuthorId,
                Year = book.Year,
                PagesCount = book.PagesCount,
            };
        }
    }
}