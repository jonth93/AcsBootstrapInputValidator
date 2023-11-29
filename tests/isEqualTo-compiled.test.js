// Import the compiled file
import InputValidator from '../dist/InputValidator';

// Test the compiled functions
test('Valid Equal to', () => {
    expect(InputValidator.isEqualTo('10', '10')).toBe(true);
});

test('Invalid Equal to', () => {
    expect(InputValidator.isEqualTo('10', '20')).toBe(false);
});

test('Check if equalTo custom error message is applied', () => {
    // Create a container div to hold the input and potential error div
    const containerDiv = document.createElement('div');

    // Create an input element
    const inputElement = document.createElement('input');
    inputElement.value = '10';

    // Append the input to the container
    containerDiv.appendChild(inputElement);

    // Validation parameters and messages
    const validationParams = { equalTo: '20' };
    const validationMessages = { equalTo: 'Inputs do not match!' };

    // Assuming your InputValidator inserts an error message as a sibling
    InputValidator.validateInput(inputElement, validationParams, validationMessages);

    // Check if the error message is inserted as a sibling to the input
    const errorMessageDiv = inputElement.nextElementSibling;

    expect(errorMessageDiv).not.toBeNull();
    expect(errorMessageDiv.classList.contains('invalid-feedback')).toBe(true);
    expect(errorMessageDiv.innerHTML).toBe('Inputs do not match!');
});
