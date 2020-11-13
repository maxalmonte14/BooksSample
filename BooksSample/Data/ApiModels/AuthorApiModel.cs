using System;

namespace BooksSample.Data.ApiModels
{
    public class AuthorApiModel
    {
        public Guid Id { get; internal set; }
        public string FirstName { get; internal set; }
        public string LastName { get; internal set; }
        public string FullName { get; internal set; }
    }
}
