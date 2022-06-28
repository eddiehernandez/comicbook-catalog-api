import config from '../../startup/config';
import application from '../../app';
import {usersRepo, comicsRepo}  from '../../repos';
import request from 'supertest';

const app = application(config, usersRepo, comicsRepo);

// describe ('HTTP /comics endpoint tests', () => {


//     test('this is a placeholder', () => {
//         expect(true).toBe(true);
//     });









// })