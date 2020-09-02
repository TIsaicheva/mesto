const formParameters = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__form-error_visible'
};

function showInputError(input, error, errorMessage, { inputErrorClass, errorClass }) {
    input.classList.add(inputErrorClass);
    error.classList.add(errorClass);
    error.textContent = errorMessage;
}

function hideInputError(input, error, { inputErrorClass, errorClass }) {
    input.classList.remove(inputErrorClass);
    error.classList.remove(errorClass);
    error.textContent = '';
}

function isValid(formElement, inputElement, { ...rest }) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
        showInputError(inputElement, errorElement, inputElement.validationMessage, rest);
    } else {
        hideInputError(inputElement, errorElement, rest);
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
        buttonElement.setAttribute('disabled', '');
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
}

function resetForm(popupElement, { inputSelector, submitButtonSelector, ...rest }) {
    const popupInputs = Array.from(popupElement.querySelectorAll(inputSelector));
    const button = popupElement.querySelector(submitButtonSelector);
    
    // Блокировка кнопки 
    toggleButtonState(popupInputs, button, rest);
    
    // Очистка формы от ошибок
    popupInputs.forEach((input) => {
        const popupErrorTexts = popupElement.querySelector(`#${input.id}-error`);
        hideInputError(input, popupErrorTexts, rest);
    });
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
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((form) => {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })

        setEventListeners(form, rest);
    });
}

enableValidation(formParameters);