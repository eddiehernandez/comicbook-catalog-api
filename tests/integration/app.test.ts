import config from '../../src/config';
import application from '../../src/app';
import {usersRepo, comicsRepo}  from '../../src/repos';
import request from 'supertest';

const app = application(config, usersRepo, comicsRepo);


describe("HTTP root endpoint tests", () => {
        
    test('GET /swagger endpoint returns 301 status code', async () => {
        const response = await request(app).get('/swagger');
        expect(response.statusCode).toBe(301);
    })

    test('Invalid url returns 404', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toContain('not found!');
    });

});