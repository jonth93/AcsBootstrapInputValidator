/**
 * Bootstrap Input Validator
 * A versatile input validation library for web applications, designed to work seamlessly with Bootstrap.
 *
 * @version 1.0.8
 * @copyright 2023 Jonathan Hayman
 * @license MIT
 */
export default class InputValidator {
    /**
    * Validates the input element based on the specified validation parameters.
    * 
    * @param {HTMLElement} element - The input element to be validated.
    * @param {Object} validationParams - An object containing validation parameters.
    * @param {Object|null} validationMessages - An object containing custom error messages for validation types.
    * @returns {boolean}
    */
    static validateInput(element, validationParams, validationMessages) {
        const errorMessages = [];

        // Check if 'required' validation is present and value is empty
        if (validationParams.required && element.value.trim() === '') {
            errorMessages.push((validationMessages?.required || 'Value is required.'));
        }

        // Check if 'min-char' validation is present and value length is less than required
        if (validationParams.hasOwnProperty('min-char') && element.value.length < validationParams['min-char']) {
            errorMessages.push((validationMessages?.['min-char'] || `Minimum ${validationParams['min-char']} characters required.`));
        }

        // Check if 'max-char' validation is present and value length is less than required
        if (validationParams.hasOwnProperty('max-char') && element.value.length > validationParams['max-char']) {
            errorMessages.push((validationMessages?.['max-char'] || `Cannot be more than ${validationParams['max-char']} characters.`));
        }

        // Check if 'in' validation is present and value is not in the specified array
        if (validationParams.in && !validationParams.in.includes(element.value)) {
            errorMessages.push((validationMessages?.in || 'Invalid value.'));
        }

        // Check if 'ipv4' validation is present and value is in the specified array
        if (validationParams.ipv4 && !this.isValidIpAddress(element.value)) {
            errorMessages.push((validationMessages?.ipv4 || 'Invalid IPv4 address.'));
        }

        // Check if 'email' validation is present and value is in the specified array
        if (validationParams.email && !this.isValidEmail(element.value)) {
            errorMessages.push((validationMessages?.email || 'Invalid email address.'));
        }

        // Check if 'url' validation is present and value is in the specified array
        if (validationParams.url && !this.isValidURL(element.value)) {
            errorMessages.push((validationMessages?.url || 'Invalid URL.'));
        }

        // Check if 'numeric' validation is present and value is not a number
        if (validationParams.numeric && !this.isNumeric(element.value)) {
            errorMessages.push((validationMessages?.numeric || 'Invalid number. Please enter a numeric value.'));
        }

        // check if 'numeric-range' validation is present and value is not a number
        if (validationParams.hasOwnProperty('numeric-range') && !this.isNumericInRange(element.value, validationParams['numeric-range']['min'], validationParams['numeric-range']['max'])) {
            errorMessages.push((validationMessages?.['numeric-range'] || 'Invalid number.'));
        }

        // Check if 'date' validation is present and value is not a valid date
        if (validationParams.date && !this.isValidDate(element.value)) {
            errorMessages.push((validationMessages?.date || 'Invalid date format.'));
        }

        // Check if 'strongPassword' validation is present and value is not a strong password
        if (validationParams.strongPassword && !this.isStrongPassword(element.value)) {
            errorMessages.push((validationMessages?.strongPassword || 'Not strong enough. Minimum 8 characters, at least one uppercase letter, one lowercase letter, and one number.'));
        }

        // Check if 'customRegex' validation is present and value doesn't match the custom regex pattern
        if (validationParams.customRegex && !this.customRegexValidation(element.value, validationParams.customRegex)) {
            errorMessages.push((validationMessages?.customRegex || 'Custom validation failed.'));
        }

        // Update the error messages in the invalid-feedback div
        this.updateErrorMessages(element, errorMessages);
        return errorMessages.length === 0;
    }

    /**
     * Updates the error messages in the next div element with the class 'invalid-feedback'.
     * 
     * @param {HTMLElement} element - The input element for which error messages are updated.
     * @param {string[]} errorMessages - An array of error messages to display.
     * @returns {void}
     */
    static updateErrorMessages(element, errorMessages) {
        // Find the parent div with class 'input-group'
        const inputGroupDiv = element.closest('.input-group');

        // Find the next div element with class 'invalid-feedback' after the input or input-group-append
        let invalidFeedbackDiv = inputGroupDiv
            ? inputGroupDiv.querySelector('.input-group-append + .invalid-feedback')
            : element.nextElementSibling;

        if (!invalidFeedbackDiv || !invalidFeedbackDiv.classList.contains('invalid-feedback')) {
            // If 'invalid-feedback' div is not found or not the next sibling, create one
            invalidFeedbackDiv = document.createElement('div');
            invalidFeedbackDiv.classList.add('invalid-feedback');

            // Insert after the input element or the input-group-append, based on the scenario
            if (inputGroupDiv) {
                const inputGroupAppendDiv = inputGroupDiv.querySelector('.input-group-append');
                if (inputGroupAppendDiv) {
                    inputGroupAppendDiv.insertAdjacentElement('afterend', invalidFeedbackDiv);
                } else {
                    inputGroupDiv.appendChild(invalidFeedbackDiv);
                }
            } else {
                element.insertAdjacentElement('afterend', invalidFeedbackDiv);
            }
        }

        // Display custom error messages or fallback to a generic message
        const errorMessage = errorMessages.length > 0
            ? errorMessages.join('<br>') // Use <br> for multiline messages
            : 'Please provide a valid input.';

        invalidFeedbackDiv.innerHTML = errorMessage;

        // Add 'is-invalid' class to the element and display the error messages
        if (errorMessages.length > 0) {
            this.addInvalidClass(element);
        } else {
            this.removeInvalidClass(element);
        }
    }

    /**
     * Add 'is-invalid' class to the element.
     * 
     * @param {HTMLElement} element - The input element to add the class to.
     * @returns {void}
     */
    static addInvalidClass(element) {
        element.classList.remove('is-valid');
        element.classList.add('is-invalid');
    }

    /**
     * Remove 'is-invalid' class from the element.
     * 
     * @param {HTMLElement} element - The input element to remove the class from.
     * @returns {void}
     */
    static removeInvalidClass(element) {
        element.classList.remove('is-invalid');
        element.classList.add('is-valid');
    }

    /**
     * Validates whether the given string represents a valid IPv4 address with optional subnet mask.
     * 
     * @param {string} ipAddress - The IP address to be validated.
     * @returns {boolean} - True if the IP address is valid, otherwise false.
     */
    static isValidIpAddress(ipAddress) {
        // Split the IP address into octets and optional subnet mask
        const [ip, subnetMask] = ipAddress.split('/');

        // Validate the IP address
        const octets = ip.split('.').map(Number);
        const validIp = (
            octets.length === 4 &&
            octets.every(octet => octet >= 0 && octet <= 255)
        );

        // If there's a subnet mask, validate it as a number between 0 and 32
        const validSubnetMask = subnetMask === undefined ||
            (subnetMask !== '' && Number(subnetMask) >= 0 && Number(subnetMask) <= 32);

        // Return true if both IP address and subnet mask are valid
        return validIp && validSubnetMask;
    }


    /**
     * Validates whether the given string represents a valid email address.
     * 
     * @param {string} email - The email address to be validated.
     * @returns {boolean} - True if the email address is valid, otherwise false.
     */
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Validates whether the given string represents a valid URL.
     * 
     * @param {string} url - The URL to be validated.
     * @returns {boolean} - True if the URL is valid, otherwise false.
     */
    static isValidURL(url) {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Validates whether the given value is numeric.
     * 
     * @param {string} value - The value to be validated.
     * @returns {boolean} - True if the value is numeric, otherwise false.
     */
    static isNumeric(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }

    /**
     * Validates whether the given numeric value is within a specified range.
     * 
     * @param {string} value - The numeric value to be validated.
     * @param {number} min - The minimum allowed value.
     * @param {number} max - The maximum allowed value.
     * @returns {boolean} - True if the value is within the specified range, otherwise false.
     */
    static isNumericInRange(value, min, max) {
        const numericValue = parseFloat(value);
        return !isNaN(numericValue) && numericValue >= min && numericValue <= max;
    }

    /**
    * Validates whether the given string represents a valid date.
    * 
    * @param {string} dateString - The date string to be validated.
    * @returns {boolean} - True if the date is valid, otherwise false.
    */
    static isValidDate(dateString) {
        const dateRegex = /^(?:(?:\d{4}-\d{2}-\d{2})|(?:\d{2}-\d{2}-(?:\d{4}|\d{2})))$/;
        return dateRegex.test(dateString);
    }

    /**
     * Validates whether the given input value matches a specified regex pattern.
     * 
     * @param {string} inputValue - The input value to be validated.
     * @param {string} regexPattern - The regex pattern to match against.
     * @returns {boolean} - True if the input value matches the regex pattern, otherwise false.
     */
    static customRegexValidation(inputValue, regexPattern) {
        const regex = new RegExp(regexPattern);
        return regex.test(inputValue);
    }

    /**
     * Validates whether the given password is strong.
     * 
     * @param {string} password - The password to be validated.
     * @returns {boolean} - True if the password is strong, otherwise false.
     */
    static isStrongPassword(password) {
        // Minimum 8 characters, at least one uppercase letter, one lowercase letter, and one number
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
    }
}
