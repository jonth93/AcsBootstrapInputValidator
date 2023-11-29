// Import the compiled file
import InputValidator from '../dist/InputValidator';

test('Valid URL', () => {
    expect(InputValidator.isValidURL('https://example.com')).toBe(true);
});

test('Invalid URL', () => {
    expect(InputValidator.isValidURL('invalid-url')).toBe(false);
});

test('Check if URL custom error message is applied', () => {
    // Create a container div to hold the input and potential error div
    const containerDiv = document.createElement('div');

    // Create an input element
    const inputElement = document.createElement('input');
    inputElement.value = 'test/test';

    // Append the input to the container
    containerDiv.appendChild(inputElement);

    // Validation parameters and messages
    const validationParams = { "url": true };
    const validationMessages = { "url": 'Invalid URL. Custom message.' };

    // Assuming your InputValidator inserts an error message as a sibling
    InputValidator.validateInput(inputElement, validationParams, validationMessages);

    // Check if the error message is inserted as a sibling to the input
    const errorMessageDiv = inputElement.nextElementSibling;

    expect(errorMessageDiv).not.toBeNull();
    expect(errorMessageDiv.classList.contains('invalid-feedback')).toBe(true);
    expect(errorMessageDiv.innerHTML).toBe('Invalid URL. Custom message.');
});