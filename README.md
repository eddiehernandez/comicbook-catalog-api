# Comicbook Catalog API (WIP)
A simple Comicbook API to manage your valuable collection!

Features Used:
* Typescript
* Swagger UI Documentation
* JWT Authentication
* Database Repos: InMemory, MongoDb (default), MySQL (coming soon)
* Jest / Supertest Integration and Unit Testing
* Git CI/CD with Heroku

Heroku Live Demo:
https://comicbook-catalog-api.herokuapp.com/swagger

Environment Variables Needed:
MONGO_DB_NAME=comicsDatabase
MONGO_HOST=
TOKEN_EXPIRETIME_SECS=3600
TOKEN_ISSUER=
TOKEN_SECRET=

FYI: 
GET /users/ endpoint exists for testing purposes.  This should be removed in production settings for obvious reasons.


