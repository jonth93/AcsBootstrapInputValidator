import { InputValidator } from '../src/inputValidator';

test('Value within the numeric range', () => {
    expect(InputValidator.isNumericInRange('5', 1, 10)).toBe(true);
});

test('Value outside the numeric range', () => {
    expect(InputValidator.isNumericInRange('15', 1, 10)).toBe(false);
});
