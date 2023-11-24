import InputValidator from '../src/inputValidator';

test('Valid IPv4 address', () => {
    expect(InputValidator.isValidIpAddress('192.168.0.1')).toBe(true);
});

test('Valid IPv4 address', () => {
    expect(InputValidator.isValidIpAddress('192.168.0.1/24')).toBe(true);
});

test('Invalid IPv4 address', () => {
    expect(InputValidator.isValidIpAddress('256.256.256.256')).toBe(false);
});

test('Invalid IPv4 address', () => {
    expect(InputValidator.isValidIpAddress('256.256.256.256/24')).toBe(false);
});

test('Invalid IPv4 address', () => {
    expect(InputValidator.isValidIpAddress('192.168.0.1/')).toBe(false);
});

test('Invalid IPv4 address', () => {
    expect(InputValidator.isValidIpAddress('192.168.0.1/33')).toBe(false);
});

test('Check if IPv4 custom error message is applied', () => {
    // Create a container div to hold the input and potential error div
    const containerDiv = document.createElement('div');

    // Create an input element
    const inputElement = document.createElement('input');
    inputElement.value = '256.256.256.256';

    // Append the input to the container
    containerDiv.appendChild(inputElement);

    // Validation parameters and messages
    const validationParams = { "ipv4": true };
    const validationMessages = { "ipv4": 'Invalid IP address. Custom message.' };

    // Assuming your InputValidator inserts an error message as a sibling
    InputValidator.validateInput(inputElement, validationParams, validationMessages);

    // Check if the error message is inserted as a sibling to the input
    const errorMessageDiv = inputElement.nextElementSibling;

    expect(errorMessageDiv).not.toBeNull();
    expect(errorMessageDiv.classList.contains('invalid-feedback')).toBe(true);
    expect(errorMessageDiv.innerHTML).toBe('Invalid IP address. Custom message.');
});