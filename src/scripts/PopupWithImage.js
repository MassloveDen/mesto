import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImageItem = this._popupElement.querySelector('.popup__image');
        this._popupImageTitle = this._popupElement.querySelector('.popup__title');
    }
        open(title, link) {
            this._popupImageItem.src = link;
            this._popupImageItem.alt = link;
            this._popupImageTitle.textContent = title;
            super.open();
    }
}