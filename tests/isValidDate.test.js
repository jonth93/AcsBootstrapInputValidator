import { InputValidator } from '../src/inputValidator';

test('Valid date', () => {
    expect(InputValidator.isValidDate('2023-11-23')).toBe(true);
});

test('Invalid date', () => {
    expect(InputValidator.isValidDate('invalid-date')).toBe(false);
});
