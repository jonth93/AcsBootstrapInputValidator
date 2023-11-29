// Import the compiled file
import InputValidator from '../dist/InputValidator';

test('Valid numeric value', () => {
    expect(InputValidator.isNumeric('123')).toBe(true);
});

test('Invalid numeric value', () => {
    expect(InputValidator.isNumeric('abc')).toBe(false);
});

test('Check if number custom error message is applied', () => {
    // Create a container div to hold the input and potential error div
    const containerDiv = document.createElement('div');

    // Create an input element
    const inputElement = document.createElement('input');
    inputElement.value = 'T';

    // Append the input to the container
    containerDiv.appendChild(inputElement);

    // Validation parameters and messages
    const validationParams = { "numeric": true };
    const validationMessages = { "numeric": 'Invalid number. Custom message.' };

    // Assuming your InputValidator inserts an error message as a sibling
    InputValidator.validateInput(inputElement, validationParams, validationMessages);

    // Check if the error message is inserted as a sibling to the input
    const errorMessageDiv = inputElement.nextElementSibling;

    expect(errorMessageDiv).not.toBeNull();
    expect(errorMessageDiv.classList.contains('invalid-feedback')).toBe(true);
    expect(errorMessageDiv.innerHTML).toBe('Invalid number. Custom message.');
});