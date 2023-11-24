import InputValidator from '../src/inputValidator';

test('Value within the numeric range', () => {
    expect(InputValidator.isNumericInRange('5', 1, 10)).toBe(true);
});

test('Value outside the numeric range', () => {
    expect(InputValidator.isNumericInRange('15', 1, 10)).toBe(false);
});

test('Check if number in range custom error message is applied', () => {
    // Create a container div to hold the input and potential error div
    const containerDiv = document.createElement('div');

    // Create an input element
    const inputElement = document.createElement('input');
    inputElement.value = '15';

    // Append the input to the container
    containerDiv.appendChild(inputElement);

    // Validation parameters and messages
    const validationParams = { "numeric-range": { "min": 1, "max": 10 }};
    const validationMessages = { "numeric-range": 'Invalid number. Custom message.' };

    // Assuming your InputValidator inserts an error message as a sibling
    InputValidator.validateInput(inputElement, validationParams, validationMessages);

    // Check if the error message is inserted as a sibling to the input
    const errorMessageDiv = inputElement.nextElementSibling;

    expect(errorMessageDiv).not.toBeNull();
    expect(errorMessageDiv.classList.contains('invalid-feedback')).toBe(true);
    expect(errorMessageDiv.innerHTML).toBe('Invalid number. Custom message.');
});