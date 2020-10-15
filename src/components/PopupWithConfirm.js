import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
    constructor({ formSubmitHandler }, popupSelector) {
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
        this._formSubmitHandler = formSubmitHandler;
        this._popupForm = this._popup.querySelector('.popup__form');
    }

    confirmAction(evt) {
        if (evt.type === 'submit') {
            return true
        } else return false
    }

    setEventListeners() {
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmitHandler(evt);         
        })
        super.setEventListeners();
    }
}