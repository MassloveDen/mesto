import './pages/index.css';

import { initialCards } from "./scripts/initialCards.js";
import { Card } from "./scripts/Card.js";
import { FormValidator } from "./scripts/FormValidator.js";
import { Section } from "./scripts/Section.js";
import { PopupWithImage } from "./scripts/PopupWithImage.js";
import { PopupWithForm } from "./scripts/PopupWithForm.js";
import { UserInfo } from "./scripts/UserInfo.js";

const profileEditPopup = document.querySelector(".popup_type_popup-edit-profile");
const profileEditForm = profileEditPopup.querySelector(".popup__form_type_edit-profile");

const cardAddPopup = document.querySelector(".popup_type_popup-add-card");
const cardAddForm = cardAddPopup.querySelector(".popup__form_type_add-card");

const profileEditButton = document.querySelector(".profile__edit-button");

// Cards
const CARD_ITEM_TEMPLATE_SELECTOR = ".element-template";
const cardsContainer = document.querySelector(".elements__list");

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

const popupWithImage = new PopupWithImage(".popup_type_popup-gallery");
popupWithImage.setEventListeners();

const cardList = new Section(
    {
      items: initialCards,
      renderer: (item) => {
        const newCard = createElement(item)
        cardList.addItem(newCard);
      },
    },
    cardsContainer
  );
  
cardList.renderCards();

const handleCardClick = (cardName, cardLink) => {
    popupWithImage.open(cardName, cardLink);
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


// Submit handlers
const handleAddFormSubmit = (e, item) => {
    e.preventDefault();
    const newCard = createElement(item)
    cardList.addItem(newCard);
};
  
  const handleProfileFormSubmit = (e, values) => {
    e.preventDefault();
    userInfo.setUserInfo(values.name, values.job);
};

const addCardPopupForm = new PopupWithForm(
    ".popup_type_popup-add-card",
    handleAddFormSubmit
);
addCardPopupForm.setEventListeners(); 

const editCardPopupForm = new PopupWithForm(
    ".popup_type_popup-edit-profile",
    handleProfileFormSubmit
);
editCardPopupForm.setEventListeners();

const userInfo = new UserInfo({
    userTitleSelector: ".profile__name",
    userTextSelector: ".profile__job",
  });

profileEditButton.addEventListener("click", () => {
    editCardPopupForm.open();
    const { title, text } = userInfo.getUserInfo();
    nameElement.value = title;
    jobElement.value = text;
});

profileAddButtonElement.addEventListener("click", () => {
    addCardPopupForm.open();
    formAddCard.reset();
    addFormValidation.toggleSubmitButton(cardAddPopup);
    addFormValidation.resetValidation();
});