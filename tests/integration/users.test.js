"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../src/config"));
const app_1 = __importDefault(require("../../src/app"));
const repos_1 = require("../../src/repos");
const supertest_1 = __importDefault(require("supertest"));
const app = (0, app_1.default)(config_1.default, repos_1.usersRepo, repos_1.comicsRepo);
describe("HTTP /users endpoint tests", () => {
    test('GET /users endpoint returns valid results', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/users');
        expect(response.statusCode).toBe(200);
        expect(response.body.count).toBeDefined;
        expect(response.body.users).toBeDefined;
    }));
    describe('POST /users/register', () => {
        test('valid email and password 201 success', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).post('/users/register').send({
                email: "test@me.com",
                password: "Test1234#"
            });
            expect(response.statusCode).toBe(201);
            expect(response.body.email).toBe('test@me.com');
            expect(response.body.password).toBeDefined;
        }));
        test('user already exists returns 409', () => __awaiter(void 0, void 0, void 0, function* () {
            const response1 = yield (0, supertest_1.default)(app).post('/users/register').send({
                email: "test@me.com",
                password: "Test1234#"
            });
            const response2 = yield (0, supertest_1.default)(app).post('/users/register').send({
                email: "test@me.com",
                password: "Test1234#"
            });
            expect(response2.statusCode).toBe(409);
            expect(response2.body.message).toContain('already exists.');
        }));
        test('missing email returns error 400', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).post('/users/register').send({
                password: "Test1234#"
            });
            expect(response.statusCode).toBe(400);
        }));
        test('missing pwd returns error 400', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).post('/users/register').send({
                email: "test@me.com"
            });
            expect(response.statusCode).toBe(400);
        }));
        test('missing email and pwd returns error 400', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).post('/users/register');
            expect(response.statusCode).toBe(400);
        }));
        test('invalid email (no @) with valid pwd returns error 400', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).post('/users/register').send({
                email: "testme.com",
                password: "Test1234#"
            });
            expect(response.statusCode).toBe(400);
        }));
        test('invalid pwd returns error 400', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).post('/users/register').send({
                email: "test@me.com",
                password: "test123"
            });
            expect(response.statusCode).toBe(400);
        }));
    });
    // describe('POST /users/login', () => {
    // });
});
