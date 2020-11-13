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
    public class AuthorsController : ControllerBase
    {
        private readonly IBookRepository _bookRepository;
        private readonly IAuthorRepository _authorRepository;

        public AuthorsController(IBookRepository repository, IAuthorRepository authorRepository)
        {
            _bookRepository = repository;
            _authorRepository = authorRepository;
        }

        [HttpGet("/api/[controller]/{id}/books")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IList<BookApiModel>>> GetBooks(Guid id)
        {
            if (!_authorRepository.Exists(id))
            {
                return NotFound();
            }

            IList<Book> books = await _bookRepository.FindByAuthorIdAsync(id);

            var models = (from book
             in books
             select
             new BookApiModel
             {
                 Id = book.Id,
                 Title = book.Name,
                 AuthorId = book.AuthorId
             })
             .ToList();

            return Ok(models);
        }

        [HttpGet("/api/[controller]")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IList<AuthorApiModel>>> GetAll()
        {
            var authors = await _authorRepository.FindAllAsync();
            var models = (from author
                            in authors
                            select
                            AuthorToApiModel(author))
                            .ToList();

            return Ok(models);
        }

        [HttpGet("/api/[controller]/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<AuthorApiModel>> Get(Guid id)
        {
            var author = await _authorRepository.FindByIdAsync(id);

            if (author == null)
            {
                return NotFound();
            }

            return Ok(AuthorToApiModel(author));
        }

        [HttpPost("/api/[controller]")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<AuthorApiModel>> Create([FromBody] Author author)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var newAuthor = await _authorRepository.AddAsync(author);

            return CreatedAtAction(nameof(Create), AuthorToApiModel(newAuthor));
        }

        [HttpDelete("/api/[controller]/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Delete(Guid id)
        {
            if (!_authorRepository.Exists(id))
            {
                return NotFound();
            }

            await _authorRepository.DeleteAsync(id);

            return NoContent();
        }

        [HttpPut("/api/[controller]/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Update(Guid id, [FromBody] Author author)
        {
            var authorFromDb = await _authorRepository.FindByIdAsync(id);

            if (authorFromDb == null)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            authorFromDb.FirstName = author.FirstName;
            authorFromDb.LastName = author.LastName;

            var updatedAuthor = await _authorRepository.UpdateAsync(author);

            return Ok(AuthorToApiModel(updatedAuthor));
        }

        private AuthorApiModel AuthorToApiModel(Author author)
        {
            return new AuthorApiModel
            {
                Id = author.Id,
                FirstName = author.FirstName,
                LastName = author.LastName,
                FullName = $"{author.FirstName} {author.LastName}",
            };
        }
    }
}