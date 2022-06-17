"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usersController_1 = require("../../../src/controllers/usersController");
describe('email validations', () => {
    describe('when email is valid', () => {
        it('returns true', () => {
            expect((0, usersController_1.validEmail)('test@me.com')).toBe(true);
        });
    });
    describe('when email is invalid', () => {
        it('returns false', () => {
            expect((0, usersController_1.validEmail)('testme.com')).toBe(false);
            expect((0, usersController_1.validEmail)('test@mecom')).toBe(false);
            expect((0, usersController_1.validEmail)('testmecom')).toBe(false);
        });
    });
});
describe('password validations', () => {
    describe('when password is valid', () => {
        it('returns true', () => {
            expect((0, usersController_1.validPassword)('Testerew5#')).toBe(true);
        });
    });
    describe('when password less then 8 chars', () => {
        it('returns true', () => {
            expect((0, usersController_1.validPassword)('Test12#')).toBe(false);
        });
    });
    describe('when password has no cap letter', () => {
        it('returns true', () => {
            expect((0, usersController_1.validPassword)('test12#3')).toBe(false);
        });
    });
    describe('when password has no lower case letter', () => {
        it('returns true', () => {
            expect((0, usersController_1.validPassword)('TEST12#3')).toBe(false);
        });
    });
    describe('when password has no number', () => {
        it('returns true', () => {
            expect((0, usersController_1.validPassword)('Testthis#')).toBe(false);
        });
    });
    describe('when password has no special character', () => {
        it('returns true', () => {
            expect((0, usersController_1.validPassword)('TESt1243')).toBe(false);
        });
    });
});
