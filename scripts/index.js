import { initialCards } from "./initialCards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

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
// const popupSaveButton  = document.querySelector(".popup__save-button");

const titleInput = document.querySelector(".popup__input_title"); 
const linkInput = document.querySelector(".popup__input_link"); 

const authorName = document.querySelector(".profile__name");
const authorJob = document.querySelector(".profile__job");

// Cards
const CARD_ITEM_TEMPLATE_SELECTOR = ".element-template";
const cardsContainer = document.querySelector(".elements__list");

// galleryPopups details
const galleryPopup = document.querySelector(".popup_type_popup-gallery");
const galleryCloseButton = galleryPopup.querySelector(".popup__close-button");
const imagePopupGallery = document.querySelector(".popup__image");
const titlePopupGallery = document.querySelector(".popup__title");

const validationSettings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save-button",
    inactiveButtonClass: "popup__save-button_invalid",
    inputErrorClass: "popup__input_state_invalid",
    errorClass: "error",
};

const userFormValidator = new FormValidator(validationSettings, profileEditForm);
userFormValidator.enableValidation();

const cardFormValidator = new FormValidator(validationSettings, cardAddForm);
cardFormValidator.enableValidation();

function openPopup(element) {
    element.classList.add("popup_opened");
    document.addEventListener("keydown", handleEscapeButton);
    element.addEventListener('click', handleClickOnOverlay);
} 

profileEditButton.addEventListener("click", () => {
    nameInput.value = authorName.textContent;
    jobInput.value = authorJob.textContent;
    openPopup(profileEditPopup);
});

cardAddButton.addEventListener('click', () => {
    openPopup(cardAddPopup);
    cardAddForm.reset();
});

const handleCardClick = (cardName, cardLink) => {
    imagePopupGallery.src = cardLink;
    imagePopupGallery.alt = cardName;
    titlePopupGallery.textContent = cardName;

    openPopup(galleryPopup);
};

const createElement = (item) => {
    const card = new Card (item, CARD_ITEM_TEMPLATE_SELECTOR, handleCardClick);
    const cardElement = card.generateCard();

    return cardElement;
}

const renderCard = (item, wrapElement) => {
    const element = createElement(item);
    wrapElement.prepend(element);
}

initialCards.forEach(function(item) {
    renderCard(item, cardsContainer, handleCardClick);
});



function closePopup(element) {
    element.classList.remove("popup_opened");
    document.removeEventListener("keydown", handleEscapeButton);
    element.removeEventListener('click', handleClickOnOverlay);
} 

function handleClickOnOverlay(e) { 
    if (e.target === e.currentTarget) { 
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened); 
    };
};

function handleEscapeButton(e) {
    if (e.key === "Escape") {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    };
};

// Close popups
profileEditPopup.addEventListener("click", handleClickOnOverlay);
cardAddPopup.addEventListener("click", handleClickOnOverlay);
galleryPopup.addEventListener("click", handleClickOnOverlay);

// Submit handlers
function formEditSubmitHandler (e) {
    e.preventDefault();
    authorName.textContent = nameInput.value;
    authorJob.textContent = jobInput.value;
    closePopup(profileEditPopup);
};

const formAddSubmitHandler = (e) => {
    e.preventDefault();
    const image = {
        name: titleInput.value,
        link: linkInput.value,
    }
    renderCard(image, cardsContainer);
    closePopup(cardAddPopup);
}

profileCloseButton.addEventListener("click", () => closePopup(profileEditPopup));
cardCloseButton.addEventListener("click", () => closePopup(cardAddPopup));
galleryCloseButton.addEventListener("click", () => closePopup(galleryPopup));

cardAddForm.addEventListener("submit", formAddSubmitHandler);
profileEditForm.addEventListener("submit", formEditSubmitHandler);