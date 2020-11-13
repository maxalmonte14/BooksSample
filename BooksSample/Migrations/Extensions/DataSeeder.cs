using BooksSample.Data.Entities;
using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace BooksSample.Migrations.Extensions
{
    public static class DataSeeder
    {
        public static void SeedBooks(this MigrationBuilder builder)
        {
            builder.InsertData(
                table: "Books",
                columns: new string[]
                {
                    nameof(Book.Id),
                    nameof(Book.Name),
                    nameof(Book.AuthorId),
                    nameof(Book.Year),
                    nameof(Book.PagesCount)
                },
                values: new object[]
                {
                    Guid.Parse("a71eb32f-be54-4764-8558-8af21fa67b86"),
                    "The Night Watchman",
                    Guid.Parse("7b72ae56-4d67-4334-bc63-ead1471bf086"),
                    "2020",
                    200
                });
            builder.InsertData(
                table: "Books",
                columns: new string[]
                {
                    nameof(Book.Id),
                    nameof(Book.Name),
                    nameof(Book.AuthorId),
                    nameof(Book.Year),
                    nameof(Book.PagesCount)
                },
                values: new object[]
                {
                    Guid.Parse("d9e38d28-786a-4874-9724-a7d3fcfa17f9"),
                    "Cleanness",
                    Guid.Parse("ac2cad8f-b8cc-4ba7-ac56-5fa5f0f263ab"),
                    "2020",
                    400
                });
            builder.InsertData(
                table: "Books",
                columns: new string[]
                {
                    nameof(Book.Id),
                    nameof(Book.Name),
                    nameof(Book.AuthorId),
                    nameof(Book.Year),
                    nameof(Book.PagesCount)
                },
                values: new object[]
                {
                    Guid.Parse("6e929176-68fe-4a7d-9b30-c81c0e63bead"),
                    "Minor Feelings: An Asian American Reckoning",
                    Guid.Parse("6b61e2f9-b5dd-42a4-a639-4a878abe8ec7"),
                    "2020",
                    256
                });
            builder.InsertData(
                table: "Books",
                columns: new string[]
                {
                    nameof(Book.Id),
                    nameof(Book.Name),
                    nameof(Book.AuthorId),
                    nameof(Book.Year),
                    nameof(Book.PagesCount)
                },
                values: new object[]
                {
                    Guid.Parse("5b8545de-bcdc-4b37-a689-c702aa9a30bb"),
                    "Dance Dance Revolution",
                    Guid.Parse("6b61e2f9-b5dd-42a4-a639-4a878abe8ec7"),
                    "2020",
                    410
                });
            builder.InsertData(
                table: "Books",
                columns: new string[]
                {
                    nameof(Book.Id),
                    nameof(Book.Name),
                    nameof(Book.AuthorId),
                    nameof(Book.Year),
                    nameof(Book.PagesCount)
                },
                values: new object[]
                {
                    Guid.Parse("b4c77f88-f488-43fa-b32d-3ea4690541bb"),
                    "Engine Empire",
                    Guid.Parse("6b61e2f9-b5dd-42a4-a639-4a878abe8ec7"),
                    "2020",
                    321
                });
            builder.InsertData(
                table: "Books",
                columns: new string[]
                {
                    nameof(Book.Id),
                    nameof(Book.Name),
                    nameof(Book.AuthorId),
                    nameof(Book.Year),
                    nameof(Book.PagesCount)
                },
                values: new object[]
                {
                    Guid.Parse("2b1880e2-2995-423a-90df-453382a55d96"),
                    "Wow, No Thank You",
                    Guid.Parse("2b34d7ce-1c7a-4958-87a1-514472599c25"),
                    "2020",
                    345
                });
            builder.InsertData(
                table: "Books",
                columns: new string[]
                {
                    nameof(Book.Id),
                    nameof(Book.Name),
                    nameof(Book.AuthorId),
                    nameof(Book.Year),
                    nameof(Book.PagesCount)
                },
                values: new object[]
                {
                    Guid.Parse("a09befe9-2e3b-4e93-8408-0db1fa99b959"),
                    "Hidden Valley Road: Inside the Mind of an American Family",
                    Guid.Parse("eb050de3-d5ff-4373-bd4b-27ff8008d9a8"),
                    "2020",
                    301
                });
            builder.InsertData(
                table: "Books",
                columns: new string[]
                {
                    nameof(Book.Id),
                    nameof(Book.Name),
                    nameof(Book.AuthorId),
                    nameof(Book.Year),
                    nameof(Book.PagesCount)
                },
                values: new object[]
                {
                    Guid.Parse("685b01ff-5962-4c7c-a250-8070883c60cb"),
                    "The Mirror & the Light",
                    Guid.Parse("bfb4b81c-3ccf-4cac-82a6-b7c85023d375"),
                    "2020",
                    345
                });
            builder.InsertData(
                table: "Books",
                columns: new string[]
                {
                    nameof(Book.Id),
                    nameof(Book.Name),
                    nameof(Book.AuthorId),
                    nameof(Book.Year),
                    nameof(Book.PagesCount)
                },
                values: new object[]
                {
                    Guid.Parse("76437b51-5ec4-48d2-b0d5-d0cb949c95ba"),
                    "Wolf Hall",
                    Guid.Parse("bfb4b81c-3ccf-4cac-82a6-b7c85023d375"),
                    "2020",
                    369
                });
            builder.InsertData(
                table: "Books",
                columns: new string[]
                {
                    nameof(Book.Id),
                    nameof(Book.Name),
                    nameof(Book.AuthorId),
                    nameof(Book.Year),
                    nameof(Book.PagesCount)
                },
                values: new object[]
                {
                    Guid.Parse("349366a2-93b3-4739-b86c-fec16181aa05"),
                    "A Place of Greater Safety",
                    Guid.Parse("bfb4b81c-3ccf-4cac-82a6-b7c85023d375"),
                    "2020",
                    410
                });
            builder.InsertData(
                table: "Books",
                columns: new string[]
                {
                    nameof(Book.Id),
                    nameof(Book.Name),
                    nameof(Book.AuthorId),
                    nameof(Book.Year),
                    nameof(Book.PagesCount)
                },
                values: new object[]
                {
                    Guid.Parse("117ef0c9-93bc-43c5-87ea-9fe5c822e04a"),
                    "Deacon King Kong, James McBride",
                    Guid.Parse("c622f923-3663-4933-b92e-808146254cd8"),
                    "2020",
                    357
                });
        }

        public static void SeedAuthors(this MigrationBuilder builder)
        {
            builder.InsertData(
                table: "Authors",
                columns: new string[] { nameof(Author.Id), nameof(Author.FirstName), nameof(Author.LastName) },
                values: new object[] { Guid.Parse("7b72ae56-4d67-4334-bc63-ead1471bf086"), "Louise", "Erdrich" });
            builder.InsertData(
                table: "Authors",
                columns: new string[] { nameof(Author.Id), nameof(Author.FirstName), nameof(Author.LastName) },
                values: new object[] { Guid.Parse("ac2cad8f-b8cc-4ba7-ac56-5fa5f0f263ab"), "Garth", "Greenwell" });
            builder.InsertData(
                table: "Authors",
                columns: new string[] { nameof(Author.Id), nameof(Author.FirstName), nameof(Author.LastName) },
                values: new object[] { Guid.Parse("6b61e2f9-b5dd-42a4-a639-4a878abe8ec7"), "Cathy", "Park Hong" });
            builder.InsertData(
                table: "Authors",
                columns: new string[] { nameof(Author.Id), nameof(Author.FirstName), nameof(Author.LastName) },
                values: new object[] { Guid.Parse("2b34d7ce-1c7a-4958-87a1-514472599c25"), "Samantha", "Irby" });
            builder.InsertData(
                table: "Authors",
                columns: new string[] { nameof(Author.Id), nameof(Author.FirstName), nameof(Author.LastName) },
                values: new object[] { Guid.Parse("eb050de3-d5ff-4373-bd4b-27ff8008d9a8"), "Robert", "Kolker" });
            builder.InsertData(
                table: "Authors",
                columns: new string[] { nameof(Author.Id), nameof(Author.FirstName), nameof(Author.LastName) },
                values: new object[] { Guid.Parse("bfb4b81c-3ccf-4cac-82a6-b7c85023d375"), "Hilary", "Mantel" });
            builder.InsertData(
                table: "Authors",
                columns: new string[] { nameof(Author.Id), nameof(Author.FirstName), nameof(Author.LastName) },
                values: new object[] { Guid.Parse("c622f923-3663-4933-b92e-808146254cd8"), "James", "McBride" });
        }
    }
}
