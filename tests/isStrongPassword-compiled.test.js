// Import the compiled file
import InputValidator from '../dist/InputValidator';

test('Valid strong password', () => {
    expect(InputValidator.isStrongPassword('StrongPass1')).toBe(true);
});

test('Invalid strong password', () => {
    expect(InputValidator.isStrongPassword('weakpassword')).toBe(false);
});

test('Check if strong password custom error message is applied', () => {
    // Create a container div to hold the input and potential error div
    const containerDiv = document.createElement('div');

    // Create an input element
    const inputElement = document.createElement('input');
    inputElement.value = '123456789';

    // Append the input to the container
    containerDiv.appendChild(inputElement);

    // Validation parameters and messages
    const validationParams = { "strongPassword": true };
    const validationMessages = { "strongPassword": 'Invalid password. Custom message.' };

    // Assuming your InputValidator inserts an error message as a sibling
    InputValidator.validateInput(inputElement, validationParams, validationMessages);

    // Check if the error message is inserted as a sibling to the input
    const errorMessageDiv = inputElement.nextElementSibling;

    expect(errorMessageDiv).not.toBeNull();
    expect(errorMessageDiv.classList.contains('invalid-feedback')).toBe(true);
    expect(errorMessageDiv.innerHTML).toBe('Invalid password. Custom message.');
});