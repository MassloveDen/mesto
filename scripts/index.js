let buttonOpenPopup = document.querySelector(".profile__edit-button");
let buttonClosePopup = document.querySelector(".popup__close-button");
let popup = document.querySelector(".popup");
let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__input_name");
let jobInput = document.querySelector(".popup__input_job");
let profileAuthor = document.querySelector(".profile__author");
let profileAuthorStatus = document.querySelector(".profile__author-status");

function popupToggle() {
    popup.classList.toggle("popup_opened");
    if (popup.classList.contains("popup_opened")) {
        nameInput.value = profileAuthor.textContent;
        jobInput.value = profileAuthorStatus.textContent;
    }
}

function onClicPopupBackgroundkListener(event) {
    if (event.target !== event.currentTarget) {
        return;
    }
    popupToggle();
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileAuthor.textContent = nameInput.value;
    profileAuthorStatus.textContent = jobInput.value;
    popupToggle();
}

formElement.addEventListener("submit", formSubmitHandler);

buttonOpenPopup.addEventListener("click", popupToggle);
buttonClosePopup.addEventListener("click", popupToggle);
popup.addEventListener("click", onClicPopupBackgroundkListener);

