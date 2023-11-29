// Import the compiled file
import InputValidator from '../dist/InputValidator';

test('Valid date', () => {
    expect(InputValidator.isValidDate('2023-11-23')).toBe(true);
});

test('Valid date', () => {
    expect(InputValidator.isValidDate('24-11-2023')).toBe(true);
});

test('Invalid date', () => {
    expect(InputValidator.isValidDate('1993')).toBe(false);
});

test('Check if date custom error message is applied', () => {
    // Create a container div to hold the input and potential error div
    const containerDiv = document.createElement('div');

    // Create an input element
    const inputElement = document.createElement('input');
    inputElement.value = '1993';

    // Append the input to the container
    containerDiv.appendChild(inputElement);

    // Validation parameters and messages
    const validationParams = { "date": true };
    const validationMessages = { "date": 'Invalid date. Custom message.' };

    // Assuming your InputValidator inserts an error message as a sibling
    InputValidator.validateInput(inputElement, validationParams, validationMessages);

    // Check if the error message is inserted as a sibling to the input
    const errorMessageDiv = inputElement.nextElementSibling;

    expect(errorMessageDiv).not.toBeNull();
    expect(errorMessageDiv.classList.contains('invalid-feedback')).toBe(true);
    expect(errorMessageDiv.innerHTML).toBe('Invalid date. Custom message.');
});