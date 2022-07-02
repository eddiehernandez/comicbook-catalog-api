import config from '../../src/startup/config';
import application from '../../src/app';
import {usersRepo, comicsRepo}  from '../../src/repos';
import request from 'supertest';

const app = application(config, usersRepo, comicsRepo);


describe("HTTP /users endpoint tests", () => {

    test('GET /users endpoint returns valid results', async () => {
        const response = await request(app).get('/users');
        expect(response.statusCode).toBe(200);
        expect(response.body.count).toBeDefined;
        expect(response.body.users).toBeDefined;
    })


//     describe('POST /users/register', () => {

//         test('valid email and password 201 success', async () => {
//             const response = await request(app).post('/users/register').send({
//                 email: "test@me.com",
//                 password: "Test1234#"
//             });
//             expect(response.statusCode).toBe(201);
//             expect(response.body.email).toBe('test@me.com');
//             expect(response.body.password).toBeDefined;
//         });

//         test('user already exists returns 409', async () => {
//             const response1 = await request(app).post('/users/register').send({
//                 email: "test@me.com",
//                 password: "Test1234#"
//             });
//             const response2 = await request(app).post('/users/register').send({
//                 email: "test@me.com",
//                 password: "Test1234#"
//             });
//             expect(response2.statusCode).toBe(409);
//             expect(response2.body.message).toContain('already exists.');
//         });

//         test('missing email returns error 400', async () => {
//             const response = await request(app).post('/users/register').send({
//                 password: "Test1234#"
//             });
//             expect(response.statusCode).toBe(400);
//         });

//         test('missing pwd returns error 400', async () => {
//             const response = await request(app).post('/users/register').send({
//                 email: "test@me.com"
//             });
//             expect(response.statusCode).toBe(400);
//         });

//         test('missing email and pwd returns error 400', async () => {
//             const response = await request(app).post('/users/register');
//             expect(response.statusCode).toBe(400);

//         });

//         test('invalid email (no @) with valid pwd returns error 400', async () => {
//             const response = await request(app).post('/users/register').send({
//                 email: "testme.com",
//                 password: "Test1234#"
//             });
//             expect(response.statusCode).toBe(400);

//         });

//         test('invalid pwd returns error 400', async () => {
//             const response = await request(app).post('/users/register').send({
//                 email: "test@me.com",
//                 password: "test123"
//             });
//             expect(response.statusCode).toBe(400);

//         });

//     });

//     // describe('POST /users/login', () => {

//     // });


});