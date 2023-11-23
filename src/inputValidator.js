/**
 * InputValidator class
 * Copyright (c) 2023 Jonathan Hayman
 */
export class InputValidator {
    /**
    * Validates the input element based on the specified validation parameters.
    * 
    * @param {HTMLElement} element - The input element to be validated.
    * @param {Object} validationParams - An object containing validation parameters.
    * @returns {boolean}
    */
    static validateInput(element, validationParams) {
        const errorMessages = [];

        // Check if 'required' validation is present and value is empty
        if (validationParams.required && element.value.trim() === '') {
            errorMessages.push('Value is required.');
        }

        // Check if 'min-char' validation is present and value length is less than required
        if (validationParams.hasOwnProperty('min-char') && element.value.length < validationParams['min-char']) {
            errorMessages.push(`Minimum ${validationParams['min-char']} characters required.`);
        }

        // Check if 'max-char' validation is present and value length is less than required
        if (validationParams.hasOwnProperty('max-char') && element.value.length > validationParams['max-char']) {
            errorMessages.push(`Cannot be more than ${validationParams['max-char']} characters.`);
        }

        // Check if 'in' validation is present and value is not in the specified array
        if (validationParams.in && !validationParams.in.includes(element.value)) {
            errorMessages.push('Invalid value.');
        }

        // Check if 'ipv4' validation is present and value is in the specified array
        if (validationParams.ipv4 && !this.isValidIpAddress(element.value)) {
            errorMessages.push('Invalid IPv4 address.');
        }

        // Check if 'email' validation is present and value is in the specified array
        if (validationParams.email && !this.isValidEmail(element.value)) {
            errorMessages.push('Invalid email address.');
        }

        // Check if 'url' validation is present and value is in the specified array
        if (validationParams.url && !this.isValidUrl(element.value)) {
            errorMessages.push('Invalid URL.');
        }

        // Check if 'numeric' validation is present and value is not a number
        if (validationParams.numeric && !this.isNumeric(element.value)) {
            errorMessages.push('Invalid number. Please enter a numeric value.');
        }

        // check if 'numeric-range' validation is present and value is not a number
        if (validationParams.hasOwnProperty('numeric-range') && !this.isNumericInRange(element.value, validationParams['numeric-range']['min'], validationParams['numeric-range']['max'])) {
            errorMessages.push('Invalid number.');
        }

        // Check if 'date' validation is present and value is not a valid date
        if (validationParams.date && !this.isValidDate(element.value)) {
            errorMessages.push('Invalid date format.');
        }

        // Check if 'strongPassword' validation is present and value is not a strong password
        if (validationParams.strongPassword && !this.isStrongPassword(element.value)) {
            errorMessages.push('Not strong enough. Minimum 8 characters, at least one uppercase letter, one lowercase letter, and one number.');
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
        // Find the next div element with class 'invalid-feedback'
        let invalidFeedbackDiv = element.nextElementSibling;

        while (invalidFeedbackDiv && !invalidFeedbackDiv.classList.contains('invalid-feedback')) {
            invalidFeedbackDiv = invalidFeedbackDiv.nextElementSibling;
        }

        if (!invalidFeedbackDiv) {
            // If 'invalid-feedback' div is not found, create one
            invalidFeedbackDiv = document.createElement('div');
            invalidFeedbackDiv.classList.add('invalid-feedback');
            element.parentNode.insertBefore(invalidFeedbackDiv, element.nextSibling);
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
    * Validates whether the given string represents a valid IPv4 address.
    * 
    * @param {string} ipAddress - The IP address to be validated.
    * @returns {boolean} - True if the IP address is valid, otherwise false.
    */
    static isValidIpAddress(ipAddress) {
        const octets = ipAddress.split('.').map(Number);
        return (
            octets.length === 4 &&
            octets.every(octet => octet >= 0 && octet <= 255) &&
            octets.join('.') === ipAddress
        );
    };

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
        // This is a simplified check
        const date = new Date(dateString);
        return !isNaN(date.getTime());
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
