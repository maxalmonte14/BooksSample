using System;

namespace BooksSample.Data.ApiModels
{
    public class BookApiModel
    {
        public Guid Id { get; internal set; }
        public string Title { get; internal set; }
        public Guid AuthorId { get; internal set; }
        public string Year { get; internal set; }
        public int PagesCount { get; internal set; }
    }
}
