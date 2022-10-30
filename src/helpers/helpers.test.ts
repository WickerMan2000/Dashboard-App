import { hasInput, validateEmail } from './helpers';

const emptyObj = { id: "", name: "", email: "", phone: "", address: "", company: "" };

describe('helpers', () => {
    describe('validateEmail', () => {
        it('should confirm that a valid email is valid', () => {
            const validEmail = 'johndoe@gmail.com';

            const isValid = validateEmail(validEmail);

            expect(isValid).toBeTruthy();
        });

        it('should confirm that an invalid email is invalid', () => {
            const invalidEmail = 'johndoegmail.com';

            const isValid = validateEmail(invalidEmail);

            expect(isValid).toBeFalsy();
        });
    });

    describe('hasInput', () => {
        it('should return true if input object has at least one value', () => {
            const result = hasInput({ ...emptyObj, name: "John Doe" });

            expect(result).toBeTruthy();
        })

        
        it('should return false if input object is empty', () => {
            const result = hasInput(emptyObj);

            expect(result).toBeFalsy();
        })
    });
});