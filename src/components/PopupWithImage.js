import Popup from "./Popup.js";
import {
    placeImageNameSelector,
    placeImageUrlSelector
} from '../utils/constants.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
    }

    open(image) {
        super.open();
        const placeImageName = this._popup.querySelector(placeImageNameSelector);
        const placeImageUrl = this._popup.querySelector(placeImageUrlSelector);
        placeImageName.textContent = image.nextElementSibling.textContent;
        placeImageUrl.src = image.src;
    }
}