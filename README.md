# ACS Bootstrap Input Validator

[![npm version](https://badge.fury.io/js/acs-bootstrap-input-validator.png)](https://badge.fury.io/js/acs-bootstrap-input-validator)
![NPM License](https://img.shields.io/npm/l/acs-bootstrap-input-validator)

A versatile input validation library for web applications using Javascript. Simplify the process of validating user input with a range of pre-built validation rules.

## Installation

```
npm install acs-bootstrap-input-validator
```

## Usage

```
// Import the InputValidator class
import { InputValidator } from 'acs-bootstrap-input-validator';

// Initialize an instance of the InputValidator
const validator = InputValidator;

// Example: Validate an input field for a required value
const inputElement = document.getElementById('myInput');
const validationParams = { required: true };

// Optional: Provide custom validation error messages
const validationMessages = {
  required: 'This field is required.',  // Example custom message for the 'required' validation
  'numeric-range': 'Please enter a number between 10 and 50.'  // Example custom message for the 'numeric-range' validation
};

validator.validateInput(inputElement, validationParams, validationMessages);
```

OR

```
validator.validateInput(document.getElementById('ELEMENT'), { 'required': true }, { 'required': 'This field is required.' });
```

### Multiple Input Validation

```
const inputElement = document.getElementById('myInput');
const inputElement2 = document.getElementById('myInput2');

// Array to store validation results
const validationResults = [];

// Validate SSID
validationResults.push(validator.validateInput(inputElement, { 'min-char': 6, 'max-char': 32, 'required': true }, { 'min-char': 'Must be at least 6 Characters', 'required': 'This field is required.' }));

// Validate channel
validationResults.push(validator.validateInput(inputElement2, { 'required': true }));

// Check if any validation failed
if (validationResults.some(result => !result)) {
    return;
}
```

## Available Validation Rules
- **`required`**: Ensures the input has a non-empty value.
- **`min-char`**: Specifies the minimum number of characters allowed.
- **`max-char`**: Specifies the maximum number of characters allowed.
- **`in`**: Validates if the input value is in a specified array.
- **`ipv4`**: Validates IPv4 addresses.
- **`email`**: Validates email addresses.
- **`url`**: Validates URLs.
- **`numeric`**: Validates if the input is a numeric value.
- **`numeric-range`**: Validates if the numeric input is within a specified range.
- **`date`**: Validates if the input is a valid date.
- **`strongPassword`**: Validates if the input is a strong password.
- **`equalTo`**: Validates if the input is equal to value provided.

## Contributing

Contributions are welcome! Please read our [contribution guidelines](/CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License.
