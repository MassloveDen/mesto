import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    // #TODO
    this._formElement = this._popupElement.querySelector(
      ".popup__form_type_add-card"
    );
    this.inputs = Array.from(
      this._formElement.querySelectorAll(".popup__input")
    );
  }

  _getInputValue() {
    const values = {};

    this._inputs.forEach((input) => {
      const name = input.name;
      const value = input.value;

      values[name] = value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (e) => {
      this._handleFormSubmit(e, this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}