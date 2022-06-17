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
describe("HTTP root endpoint tests", () => {
    test('GET /swagger endpoint returns 301 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/swagger');
        expect(response.statusCode).toBe(301);
    }));
    test('Invalid url returns 404', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/');
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toContain('not found!');
    }));
});
