export class FormValidator {
    constructor(formParameters, form) {
        this._form = form;
        this._parameters = formParameters;
    }

    _showInputError(input, error, errorMessage, { inputErrorClass, errorClass }) {
        input.classList.add(inputErrorClass);
        error.classList.add(errorClass);
        error.textContent = errorMessage;
    }

    _hideInputError(input, error, { inputErrorClass, errorClass }) {
        input.classList.remove(inputErrorClass);
        error.classList.remove(errorClass);
        error.textContent = '';
    }

    _isValid(inputElement, { ...rest }) {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, errorElement, inputElement.validationMessage, rest);
        } else {
            this._hideInputError(inputElement, errorElement, rest);
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some((input) => {
            return !input.validity.valid;
        })

    }

    _toggleButtonState(inputList, buttonElement, { inactiveButtonClass, ...rest }) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(inactiveButtonClass);
            buttonElement.setAttribute('disabled', '');
        } else {
            buttonElement.classList.remove(inactiveButtonClass);
            buttonElement.removeAttribute('disabled');
        }
    }

    _resetForm(inputList) {
        inputList.forEach((input) => {
            const inputErrorElem = this._form.querySelector(`#${input.id}-error`);
            this._hideInputError(input, inputErrorElem, this._parameters);
        })
    }

    _setEventListeners({ inputSelector, submitButtonSelector, ...rest }) {
        const inputList = Array.from(this._form.querySelectorAll(inputSelector));
        const button = this._form.querySelector(submitButtonSelector);
        this._toggleButtonState(inputList, button, rest);
        // перед валидацией очищать все поля формы от ошибок при каждом открытии формы
        this._resetForm(inputList);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._toggleButtonState(inputList, button, rest);
                this._isValid(inputElement, rest);
            })
        });
    }

    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })

        this._setEventListeners(this._parameters);
    }
}