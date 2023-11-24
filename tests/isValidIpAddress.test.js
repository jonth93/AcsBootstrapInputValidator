import { InputValidator } from '../src/inputValidator';

test('Valid IPv4 address', () => {
    expect(InputValidator.isValidIpAddress('192.168.0.1')).toBe(true);
});

test('Invalid IPv4 address', () => {
    expect(InputValidator.isValidIpAddress('256.256.256.256')).toBe(false);
});
