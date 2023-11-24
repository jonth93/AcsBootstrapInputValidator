# ACS Bootstrap Input Validator

[![npm version](https://badge.fury.io/js/acs-bootstrap-input-validator.svg)](https://badge.fury.io/js/acs-bootstrap-input-validator)

A versatile input validation library for web applications using Javascript. Simplify the process of validating user input with a range of pre-built validation rules.

## Installation

```
npm install acs-bootstrap-input-validator
```

## Usage

```
// Import the InputValidator class
import { InputValidator } from 'input-validator';

// Initialize an instance of the InputValidator
const validator = new InputValidator();

// Example: Validate an input field for a required value
const inputElement = document.getElementById('myInput');
const validationParams = { required: true };

validator.validateInput(inputElement, validationParams);
```

OR

```
validator.validateInput(document.getElementById('ELEMENT'), { 'required': true });
```

### Multiple Input Validation

```
const inputElement = document.getElementById('myInput');
const inputElement2 = document.getElementById('myInput2');

// Array to store validation results
const validationResults = [];

// Validate SSID
validationResults.push(validator.validateInput(inputElement, { 'min-char': 6, 'max-char': 32, 'required': true }));

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
- **`strongPassword`**: Validates if the input is a strong password.Contributing

## Contributing

Contributions are welcome! Please read our [contribution guidelines](/CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License.
