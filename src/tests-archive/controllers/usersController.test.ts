import { validEmail, validPassword } from '../../controllers/usersController'

describe('email validations', () => {

    describe('when email is valid', () => {
        it('returns true', () => {
            expect(validEmail('test@me.com')).toBe(true);
        });
        
    })

    describe('when email is invalid', () => {
        it('returns false', () => {
            expect(validEmail('testme.com')).toBe(false);
            expect(validEmail('test@mecom')).toBe(false);            
            expect(validEmail('testmecom')).toBe(false);            
        })
    }
    )


});


describe('password validations', () => {

    describe('when password is valid', () => {
        it('returns true', () => {
            expect(validPassword('Testerew5#')).toBe(true);
        });
    });

    describe('when password less then 8 chars', () => {
        it('returns true', () => {
            expect(validPassword('Test12#')).toBe(false);
        });
    });

    describe('when password has no cap letter', () => {
        it('returns true', () => {
            expect(validPassword('test12#3')).toBe(false);
        });
    });

    describe('when password has no lower case letter', () => {
        it('returns true', () => {
            expect(validPassword('TEST12#3')).toBe(false);
        });
    });

    describe('when password has no number', () => {
        it('returns true', () => {
            expect(validPassword('Testthis#')).toBe(false);
        });
    });

    describe('when password has no special character', () => {
        it('returns true', () => {
            expect(validPassword('TESt1243')).toBe(false);
        });
    });

})
