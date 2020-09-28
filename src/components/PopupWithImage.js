import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector, placeImageNameSelector, placeImageUrlSelector) {
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
        this._placeImageName = this._popup.querySelector(placeImageNameSelector);
        this._placeImageUrl = this._popup.querySelector(placeImageUrlSelector);
    }

    open(cardName, cardLinkImage) {
        super.open();
        this._placeImageName.textContent = cardName;
        this._placeImageUrl.src = cardLinkImage;
    }
}