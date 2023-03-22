function showError(formElement, input, {inputErrorClass, errorClass}) {
    const errorElement = formElement.querySelector(`#${input.id}-${errorClass}`);
    errorElement.textContent = input.validationMessage;
    input.classList.add(inputErrorClass);
}

function hideError(formElement, input, {inputErrorClass, errorClass}) {
    const errorElement = formElement.querySelector(`#${input.id}-${errorClass}`);
    errorElement.textContent = "";
    input.classList.remove(inputErrorClass);
}

function checkInputValidity(formElement, input, {inputErrorClass, ...rest}) {
    if (input.checkValidity()) {
        hideError(formElement, input, {inputErrorClass, ...rest});
    } else {
        showError(formElement, input, {inputErrorClass, ...rest});
    }
}
function toggleButtonState(formElement, buttonElement, {inactiveButtonClass}) {
    if (formElement.checkValidity()) {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    } else {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    }
}

function setEventListener(formElement, {inputSelector, submitButtonSelector, ...rest}) {
    const inputElements = Array.from(
      formElement.querySelectorAll(inputSelector)
    );
    const buttonElement = formElement.querySelector(submitButtonSelector);
    disableButtonSubmit(buttonElement);
    inputElements.forEach((input) => {
        input.addEventListener("input", (evt) => {
            checkInputValidity(formElement, evt.target, {...rest});
            toggleButtonState(formElement, buttonElement, {...rest});
        });
    });
    toggleButtonState(formElement, buttonElement, {...rest});
}

function enableValidation({formSelector, ...rest}) {
    const formElements = Array.from(
        document.querySelectorAll(".popup__form")
    );
    formElements.forEach((form) => {
        form.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        setEventListener(form, {...rest});
    });
}
function disableButtonSubmit(buttonElement) {
    console.log(buttonElement);
    buttonElement.classList.add('popup__save-button_invalid')
    buttonElement.disabled = true;
}
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_invalid',
    inputErrorClass: 'popup__input_state_invalid',
    errorClass: 'error'
  });