"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../src/config"));
const app_1 = __importDefault(require("../../src/app"));
const repos_1 = require("../../src/repos");
const app = (0, app_1.default)(config_1.default, repos_1.usersRepo, repos_1.comicsRepo);
describe('HTTP /comics endpoint tests', () => {
    test('this is a placeholder', () => {
        expect(true).toBe(true);
    });
});
