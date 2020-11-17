using System;
using System.ComponentModel.DataAnnotations;

namespace BooksSample.Data.ApiModels
{
    public class BookApiModel
    {
        public Guid Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public Guid AuthorId { get; set; }

        [Required]
        public string Year { get; set; }

        [Required]
        public int PagesCount { get; set; }
    }
}
