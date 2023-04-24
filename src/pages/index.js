import "./index.css";

import { initialCards } from "../utils/initialCards.js";
import { validationSettings } from "../utils/validationSettings";
import { Card } from "../scripts/Card.js";
import { FormValidator } from "../scripts/FormValidator.js";
import { Section } from "../scripts/Section.js";
import { PopupWithImage } from "../scripts/PopupWithImage.js";
import { PopupWithForm } from "../scripts/PopupWithForm.js";
import { UserInfo } from "../scripts/UserInfo.js";

const profileEditPopup = document.querySelector(".popup_type_popup-edit-profile");
const profileEditForm = profileEditPopup.querySelector(".popup__form_type_edit-profile");

const nameInput = profileEditForm.querySelector(".popup__input_name");
const jobInput = profileEditForm.querySelector(".popup__input_job");

const cardAddPopup = document.querySelector(".popup_type_popup-add-card");
const cardAddForm = cardAddPopup.querySelector(".popup__form_type_add-card");

const profileEditButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");

// Cards
const CARD_ITEM_TEMPLATE_SELECTOR = ".element-template";
const cardsContainer = document.querySelector(".elements__list");

const profileFormValidation = new FormValidator(validationSettings, profileEditForm);
profileFormValidation.enableValidation();

const cardFormValidator = new FormValidator(validationSettings, cardAddForm);
cardFormValidator.enableValidation();

const popupWithImage = new PopupWithImage(".popup_type_popup-gallery");
popupWithImage.setEventListeners();

const handleCardClick = (cardName, cardLink) => {
  popupWithImage.open(cardName, cardLink);
};

const createCard = (cardData) => {
  const card = new Card(cardData, CARD_ITEM_TEMPLATE_SELECTOR, handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
};

const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const newCard = createCard(cardData);
      cardList.addItem(newCard);
    },
  },
  cardsContainer
);

cardList.renderCards();

// Submit handlers
const handleCardFormSubmit = (e, item) => {
  e.preventDefault();
  const newCard = createCard(item);
  cardList.addItem(newCard);
};

const handleProfileFormSubmit = (e, values) => {
  e.preventDefault();
  userInfo.setUserInfo(values.name, values.job);
};

const addCardPopupForm = new PopupWithForm(
  ".popup_type_popup-add-card",
  handleCardFormSubmit
);
addCardPopupForm.setEventListeners();

const editProfilePopupForm = new PopupWithForm(
  ".popup_type_popup-edit-profile",
  handleProfileFormSubmit
);
editProfilePopupForm.setEventListeners();

const userInfo = new UserInfo({
  userTitleSelector: ".profile__name",
  userTextSelector: ".profile__job",
});

profileEditButton.addEventListener("click", () => {
  editProfilePopupForm.open();
  const { title, text } = userInfo.getUserInfo();
  nameInput.value = title;
  jobInput.value = text;
});

cardAddButton.addEventListener("click", () => {
  addCardPopupForm.open();
  cardAddForm.reset();
  cardFormValidator._toggleSubmitButton();
  // cardFormValidator.resetValidation();
});
