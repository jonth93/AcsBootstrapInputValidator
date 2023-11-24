import { InputValidator } from '../src/inputValidator';

test('Valid strong password', () => {
    expect(InputValidator.isStrongPassword('StrongPass1')).toBe(true);
});

test('Invalid strong password', () => {
    expect(InputValidator.isStrongPassword('weakpassword')).toBe(false);
});
