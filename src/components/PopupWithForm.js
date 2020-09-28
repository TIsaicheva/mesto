import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ formSubmitHandler }, popupSelector) {
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
        this._formSubmitHandler = formSubmitHandler;
        this._popupForm = this._popup.querySelector('.popup__form');
    }

    _getInputValues() {
        const formValues = {};
        const inputList = this._popup.querySelectorAll('.popup__input');
        inputList.forEach(input => {
            formValues[input.name] = input.value;
        });

        return formValues;
    }

    setEventListeners() {
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmitHandler(this._getInputValues());
        })
        super.setEventListeners();
    }

    close() {
        this._popupForm.reset();
        super.close();
    }
}