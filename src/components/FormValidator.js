export default class FormValidator {
    constructor(formParameters, form) {
        this._form = form;
        this._inputSelector = formParameters.inputSelector;
        this._submitButtonSelector = formParameters.submitButtonSelector;
        this._inactiveButtonClass = formParameters.inactiveButtonClass;
        this._inputErrorClass = formParameters.inputErrorClass;
        this._errorClass = formParameters.errorClass;
        this._openFormBtn = formParameters.formButton;
    }

    _showInputError(input, error, errorMessage) {
        input.classList.add(this._inputErrorClass);
        error.classList.add(this._errorClass);
        error.textContent = errorMessage;
    }

    _hideInputError(input, error) {
        input.classList.remove(this._inputErrorClass);
        error.classList.remove(this._errorClass);
        error.textContent = '';
    }

    _isValid(inputElement) {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, errorElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement, errorElement);
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some((input) => {
            return !input.validity.valid;
        })
    }

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.setAttribute('disabled', '');
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.removeAttribute('disabled');
        }
    }

    _resetForm(inputList) {
        inputList.forEach((input) => {
            const inputErrorElem = this._form.querySelector(`#${input.id}-error`);
            this._hideInputError(input, inputErrorElem);
        })
    }

    _setEventListeners() {
        const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        const button = this._form.querySelector(this._submitButtonSelector);
        const openFormButtons = document.querySelectorAll(this._openFormBtn);

        this._toggleButtonState(inputList, button);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonState(inputList, button);
            })
        });

        // при каждом открытии форм очищать все поля от ошибок      
        openFormButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                this._resetForm(inputList);
                this._toggleButtonState(inputList, button);
            });
        })
    }

    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })

        this._setEventListeners();
    }
}