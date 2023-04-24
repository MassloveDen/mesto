export class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._button = this._form.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
  }

  _showError(input) {
    const errorElement = this._form.querySelector(
      `#${input.id}-${this._errorClass}`
    );
    errorElement.textContent = input.validationMessage;
    input.classList.add(this._inputErrorClass);
  }

  _hideError(input) {
    const errorElement = this._form.querySelector(
      `#${input.id}-${this._errorClass}`
    );
    errorElement.textContent = "";
    input.classList.remove(this._inputErrorClass);
  }

  _checkInputValidity(input) {
    if (input.checkValidity()) {
      this._hideError(input);
    } else {
      this._showError(input);
    }
  }

  _isInputValid() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    })
  }

  _toggleSubmitButton() {
    if (this._isInputValid()) {
      this._button.classList.add(this._inactiveButtonClass);
      this._button.setAttribute('disabled', true)
    } else {
      this._button.classList.remove(this._inactiveButtonClass);
      this._button.removeAttribute('disabled')
    }
  }

  _setEventListener() {
    this._toggleSubmitButton()
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleSubmitButton();
      })
    })
    
  }

  enableValidation() {
    this._setEventListener()
  }
}