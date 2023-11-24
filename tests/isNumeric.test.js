import { InputValidator } from '../src/inputValidator';

test('Valid numeric value', () => {
    expect(InputValidator.isNumeric('123')).toBe(true);
});

test('Invalid numeric value', () => {
    expect(InputValidator.isNumeric('abc')).toBe(false);
});
