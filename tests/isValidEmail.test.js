import InputValidator from '../src/inputValidator';

test('Valid email address', () => {
    expect(InputValidator.isValidEmail('test@example.com')).toBe(true);
});

test('Invalid email address', () => {
    expect(InputValidator.isValidEmail('invalid-email')).toBe(false);
});

test('Check if email custom error message is applied', () => {
    // Create a container div to hold the input and potential error div
    const containerDiv = document.createElement('div');

    // Create an input element
    const inputElement = document.createElement('input');
    inputElement.value = 'test.com';

    // Append the input to the container
    containerDiv.appendChild(inputElement);

    // Validation parameters and messages
    const validationParams = { "email": true };
    const validationMessages = { "email": 'Invalid email address. Custom message.' };

    // Assuming your InputValidator inserts an error message as a sibling
    InputValidator.validateInput(inputElement, validationParams, validationMessages);

    // Check if the error message is inserted as a sibling to the input
    const errorMessageDiv = inputElement.nextElementSibling;

    expect(errorMessageDiv).not.toBeNull();
    expect(errorMessageDiv.classList.contains('invalid-feedback')).toBe(true);
    expect(errorMessageDiv.innerHTML).toBe('Invalid email address. Custom message.');
});