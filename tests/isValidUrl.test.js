import { InputValidator } from '../src/inputValidator';

test('Valid URL', () => {
    expect(InputValidator.isValidURL('https://example.com')).toBe(true);
});

test('Invalid URL', () => {
    expect(InputValidator.isValidURL('invalid-url')).toBe(false);
});
