import { InputValidator } from '../src/inputValidator';

test('Valid email address', () => {
    expect(InputValidator.isValidEmail('test@example.com')).toBe(true);
});

test('Invalid email address', () => {
    expect(InputValidator.isValidEmail('invalid-email')).toBe(false);
});
