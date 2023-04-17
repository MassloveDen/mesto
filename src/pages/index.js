import { initialCards } from "./scripts/initialCards.js";
import { Card } from "./scripts/Card.js";
import { FormValidator } from "./scripts/FormValidator.js";

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

const createCard = (cardData) => {
    const card = new Card (cardData, CARD_ITEM_TEMPLATE_SELECTOR, handleCardClick);
    const cardElement = card.generateCard();

    return cardElement;
}

const renderCard = (cardData, wrapElement) => {
    const element = createCard(cardData);
    wrapElement.prepend(element);
}

initialCards.forEach(function(cardData) {
    renderCard(cardData, cardsContainer, handleCardClick);
});



function closePopup(element) {
    element.classList.remove("popup_opened");
    document.removeEventListener("keydown", handleEscapeButton);
    element.removeEventListener('click', handleClickOnOverlay);
} 

function handleClickOnOverlay(e) { 
    if (e.target === e.currentTarget) { 
        const popupOpened = e.target;
        closePopup(popupOpened); 
    };
};

function handleEscapeButton(e) {
    if (e.key === "Escape") {
        const popupOpened = document.querySelector('.popup_opened');
        // ToDo
        // console.log(e.target === e.currentTarget);
        // if (e.target !== e.currentTarget) { closePopup(popupOpened); }
        closePopup(popupOpened);
    };
};

// Submit handlers
function handleProfileFormSubmit (e) {
    e.preventDefault();
    authorName.textContent = nameInput.value;
    authorJob.textContent = jobInput.value;
    closePopup(profileEditPopup);
};

const handleCardFormSubmit = (e) => {
    e.preventDefault();
    const cardData = {
        name: titleInput.value,
        link: linkInput.value,
    }
    renderCard(cardData, cardsContainer);
    closePopup(cardAddPopup);
}

profileCloseButton.addEventListener("click", () => closePopup(profileEditPopup));
cardCloseButton.addEventListener("click", () => closePopup(cardAddPopup));
galleryCloseButton.addEventListener("click", () => closePopup(galleryPopup));

cardAddForm.addEventListener("submit", handleCardFormSubmit);
profileEditForm.addEventListener("submit", handleProfileFormSubmit);