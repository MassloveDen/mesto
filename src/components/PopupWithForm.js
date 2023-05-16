import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({handleFormSubmit}, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector(".popup__form");
    this._inputs = Array.from(this._formElement.querySelectorAll(".popup__input"));
    this._button = this._formElement.querySelector('.popup__save-button');
    this._buttonText = this._button.textContent;
  }

  _getInputValues() {
    this.values = {};
    this._inputs.forEach(input => {
      const name = input.name
      const value = input.value

      values[name] = value
    })
      
    return values;   
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      const initialText = this._button.textContent;
      this._button.textContent = 'Сохранение...';

      this._handleFormSubmit(this._getInputValues())
      .then(() => this.close())
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        this._button.textContent = initialText;
      })
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
