import { initialCards } from "./initialCards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

// const popup = document.querySelector(".popup");

const profileEditPopup = document.querySelector(".popup_type_popup-edit-profile");
const profileCloseButton = profileEditPopup.querySelector(".popup__close-button");
const profileEditForm = profileEditPopup.querySelector(".popup__form_type_edit-profile");

const nameInput = profileEditForm.querySelector(".popup__input_name");
const jobInput = profileEditForm.querySelector(".popup__input_job");

const cardAddPopup = document.querySelector(".popup_type_popup-add-card");
const cardCloseButton = cardAddPopup.querySelector(".popup__close-button");
const cardAddForm = cardAddPopup.querySelector(".popup__form_type_add-card");

const profileEditButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");
const saveButton = document.querySelector(".popup__save-button");

const titleInput = document.querySelector(".popup__input_title"); 
const linkInput = document.querySelector(".popup__input_link"); 

const authorName = document.querySelector(".profile__name");
const authorJob = document.querySelector(".profile__job");

// Cards
const CARD_ITEM_TEMPLATE_SELECTOR = ".element-template";
const container = document.querySelector(".elements__list");

// galleryPopups details
const galleryPopup = document.querySelector(".popup_type_popup-gallery");
const galleryCloseButton = galleryPopup.querySelector(".popup__close-button");
const imagePopupGallery = document.querySelector(".popup__image");
const titlePopupGallery = document.querySelector(".popup__title");

const popupOpened = document.querySelector(".popup_opened");

// Close buttons
// const formElement = document.querySelector(".popup__form");

// Submit buttons
// const formElement = document.querySelector(".popup__form");
// const buttonElement = document.querySelector(".popup__save-button");
// const popupSaveButton = cardAddPopup.querySelector(".popup__save-button");
// const inactiveButtonClass = (".popup__save-button");

const settings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save-button",
    inactiveButtonClass: "popup__save-button_invalid",
    inputErrorClass: "popup__input_state_invalid",
    errorClass: "error",
};

const userEditForm = new FormValidator(settings, profileEditForm);
userEditForm.enableValidation();

const newCardForm = new FormValidator(settings, cardAddForm);
newCardForm.enableValidation();

const handleImagePreview = (card) => {
    imagePopupGallery.src = card._link;
    imagePopupGallery.alt = card._name;
    titlePopupGallery.textContent = card._name;

    openPopup(galleryPopup);
};

initialCards.forEach((item) => {
    const card = new Card(
        item,
        CARD_ITEM_TEMPLATE_SELECTOR,
        handleImagePreview
    );
    const cardElement = card.generateCard();

    container.append(cardElement);
});

function openPopup(element) {
    element.classList.add("popup_opened");
    document.addEventListener("keydown", handleEscapeButton);  
} 

function closePopup(element) {
    element.classList.remove("popup_opened");
    document.removeEventListener("keydown", handleEscapeButton);
} 

function handleClickOnOverlay(event) { 
    const popup = event.currentTarget;
    if (event.target !== popup) { 
        return; 
    };
    closePopup(popup); 
};

function handleEscapeButton(evt) {
    if (evt.key === "Escape") {
        closePopup(popupOpened);
    };
};

// Close popups
profileEditPopup.addEventListener("click", handleClickOnOverlay);
cardAddPopup.addEventListener("click", handleClickOnOverlay);
galleryPopup.addEventListener("click", handleClickOnOverlay);

profileCloseButton.addEventListener("click", () => closePopup(profileEditPopup));
cardCloseButton.addEventListener("click", () => closePopup(cardAddPopup));
galleryCloseButton.addEventListener("click", () => closePopup(galleryPopup))

// Open popups
profileEditButton.addEventListener("click", () => {
    openPopup(profileEditPopup);
    const buttonElement = userEditForm.addInactiveButtonClass(saveButton);
    nameInput.value = authorName.textContent;
    jobInput.value = authorJob.textContent;
});

cardAddButton.addEventListener("click", () => {
    openPopup(cardAddPopup);
    newCardForm.addInactiveButtonClass(saveButton);
});

// Submit handlers
profileEditForm.addEventListener("submit", (e) => {
    e.preventDefault();
    authorName.textContent = nameInput.value;
    authorJob.textContent = jobInput.value;
    closePopup(profileEditPopup);
});
cardAddForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newCard = new Card(
        {
        name: titleInput.value,
        link: linkInput.value,
        },
        CARD_ITEM_TEMPLATE_SELECTOR,
        handleImagePreview
    );
    const cardElement = newCard.generateCard();
    container.prepend(cardElement);
    closePopup(cardAddPopup);
});

