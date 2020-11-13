## Installation

Clone the repo and run `dotnet restore` in the root of the project, then go to the `ClientApp` folder and run `npm install` to install client dependencies.

## Setup

Before running the app it's necessary to create the database tables and populate them, to do that run `dotnet ef database update`.

**Note:** I'm assuming you already have the `dotnet ef` tool installed, if it's not the case run `dotnet tool --global install dotnet-ef` before trying to run the migrations.

## Running

Run `dotnet run` in the root of the project, this should start the server for the backend at http://localhost:5000.

It can also be ran by selecting the BooksSample profile in Visual Studio.

Then go to the `ClientApp` folder and run `npm run start` this should start the client app at http://localhost:5000.

## Endpoints

| Route           | HTTP method | Parameters                                            |
|-----------------|-------------|-------------------------------------------------------|
| /api/books      | GET         |                                                       |
| /api/books/{id} | GET         | id:guid                                               |
| /api/books      | POST        | authorId:guid title:string year:string pagesCount:int |
| /api/books/{id} | DELETE      | id:guid                                                       |
| /api/books/{id} | PUT         | id:guid authorId:guid title:string year:string pagesCount:int |
| /api/authors            | GET         |                                            |
| /api/authors/{id}       | GET         | id:guid                                    |
| /api/authors            | POST        | firstName: string lastName: string         |
| /api/authors/{id}       | PUT         | id:guid firstName: string lastName: string |
| /api/authors/{id}       | DELETE      | id:guid                                    |
| /api/authors/{id}/books | GET         | id:guid                                    |

## Remarks

The [link](https://fakerestapi.azurewebsites.net/swagger/ui/index) provided for third-party API integration  returns a 404 HTTP status, therefore the integration wasn't possible.