import config from '../../src/config';
import application from '../../src/app';
import {usersRepo, comicsRepo}  from '../../src/repos';
import request from 'supertest';

const app = application(config, usersRepo, comicsRepo);

describe ('HTTP /comics endpoint tests', () => {


    test('this is a placeholder', () => {
        expect(true).toBe(true);
    });









})