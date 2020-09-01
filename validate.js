function showInputError(form, input, error, errorMessage, { inputErrorClass, errorClass }) {
    input.classList.add(inputErrorClass);
    error.classList.add(errorClass);
    error.textContent = errorMessage;
}

function hideInputError(form, input, error, { inputErrorClass, errorClass }) {
    input.classList.remove(inputErrorClass);
    error.classList.remove(errorClass);
    error.textContent = '';
}

function isValid(formElement, inputElement, { ...rest }) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, errorElement, inputElement.validationMessage, rest);

    } else {
        hideInputError(formElement, inputElement, errorElement, rest);

    }
}

function hasInvalidInput(inputList) {
    return inputList.some((input) => {
        return !input.validity.valid;
    })
}

function toggleButtonState(inputList, buttonElement, { inactiveButtonClass, ...rest }) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
    }
}

function setEventListeners(formElement, { inputSelector, submitButtonSelector, ...rest }) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const button = formElement.querySelector(submitButtonSelector);

    toggleButtonState(inputList, button, rest);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            isValid(formElement, inputElement, rest);
            toggleButtonState(inputList, button, rest);
        })
    });
}

function enableValidation({ formSelector, ...rest }) {
    const popupFormList = Array.from(document.querySelectorAll(formSelector));

    popupFormList.forEach((popupForm) => {
        popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })        
        
        setEventListeners(popupForm, rest);
    });
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__form-error_visible'
});