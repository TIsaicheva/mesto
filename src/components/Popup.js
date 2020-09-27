import { keyCodeEsc } from '../utils/constants.js';

export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    _handleEscClose(evt) {
        if (evt.key === keyCodeEsc) {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.querySelector('.popup__close').addEventListener('click', () => {
            this.close();
        })

        addEventListener('keydown', (evt) => {
            this._handleEscClose(evt);
        })

        this._popup.addEventListener('click', (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        })
    }

    open() {
        this._popup.classList.add('popup_opened');
        this.setEventListeners();
    }

    close() {
        this._popup.classList.remove('popup_opened');
    }
}