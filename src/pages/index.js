import "./index.css";

// import { initialCards } from "../utils/initialCards.js";
import { validationSettings } from "../utils/validationSettings";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-65",
  headers: {
    authorization: "903055f9-162d-412b-9680-733441b943a2",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  userTitleSelector: ".profile__name",
  userTextSelector: ".profile__job",
  avatarSelector: ".profile__avatar",
});

const cardList = new Section(
  {
    renderer: (cardData) => {
      const newCard = createCard(cardData);
      cardList.addItem(newCard);
    },
  },
  cardsContainer
);

const profileEditPopup = document.querySelector(
  ".popup_type_popup-edit-profile"
);
const profileEditForm = profileEditPopup.querySelector(
  ".popup__form_type_edit-profile"
);

const nameInput = profileEditForm.querySelector(".popup__input_name");
const jobInput = profileEditForm.querySelector(".popup__input_job");

// const cardAddPopup = document.querySelector(".popup_type_popup-add-card");
// const cardAddForm = cardAddPopup.querySelector(".popup__form_type_add-card");

const profileEditButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");
const profileAvatarButton = document.querySelector(".profile__edit-avatar");

// Cards
const CARD_ITEM_TEMPLATE_SELECTOR = ".element-template";
const cardsContainer = document.querySelector(".elements__list");

const profileFormValidation = new FormValidator(
  validationSettings,
  profileEditForm
);
profileFormValidation.enableValidation();

const popupWithImage = new PopupWithImage(".popup_type_popup-gallery");
popupWithImage.setEventListeners();

const popupWithConfirmation = new PopupWithConfirmation(
  ".popup_confirm",
  handleCardDelete
);
popupWithConfirmation.setEventListeners();

const renderInitCards = (cards) => {
  cardList.renderCards(cards);
};

Promise.all([api.getInfo(), api.getInitialCards()])
  .then(([data, initialCards]) => {
    userInfo.setUserInfo(data);
    renderInitCards(initialCards);
  })
  .catch((error) => {
    console.log(error);
  });

const handleCardDelete = async (card) => {
  console.log(card);
  const id = card.getCardId();
  try {
    await api.deleteCard(id);
    popupWithConfirmation.close();
    card.deleteCard();
  } catch (error) {
    console.log(error);
  }
};

const createCard = (cardData) => {
  const card = new Card(
    cardData,
    userInfo.getUserId(),
    CARD_ITEM_TEMPLATE_SELECTOR,
    {
      handleCardClick: (title, link) => {
        popupWithImage.open(title, link);
      },
      handleLikeClick: () => {
        const id = card.getCardId();
        const isLiked = card.defineLikes();
        console.log(isLiked);
        const resultApi = isLiked ? api.removeLike(id) : api.addLike(id);
        resultApi
          .then((initialCards) => {
            card.setLikes(initialCards);
            card.renderLikes();
          })
          .catch((error) => {
            console.log(error);
          });
      },
      handleDeleteClick: () => {
        popupWithConfirmation.open(card);
      },
    }
  );
  return card.generateCard();
};

const addCardPopupForm = new PopupWithForm(
  {
    handleFormSubmit: async (card) => {
      try {
        const data = await api.createCard(card);
        const cardElement = createCard(data);
        cardList.prependCard(cardElement);
      } catch (error) {
        console.log(error);
      }
    },
  },
  "#popup__add"
);
addCardPopupForm.setEventListeners();

const editProfilePopupForm = new PopupWithForm(
  {
    handleFormSubmit: async (data) => {
      try {
        const newData = await api.addInfo(data);
        userInfo.setUserInfo(newData);
      } catch (error) {
        console.log(error);
      }
    },
  },
  "#popup__edit"
);
editProfilePopupForm.setEventListeners();

const avatarPopupForm = new PopupWithForm(
  {
    handleFormSubmit: async (avatar) => {
      try {
        const data = await api.addAvatar(avatar);
        userInfo.setUserInfo(data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  "#popup__avatar"
);
avatarPopupForm.setEventListeners();

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationSettings, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(validationSettings);

profileEditButton.addEventListener("click", () => {
  editProfilePopupForm.open();
  const { name, info } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = info;
  formValidators["edit"].resetValidation();
});

cardAddButton.addEventListener("click", () => {
  addCardPopupForm.open();
  formValidators["add"].toggleSubmitButton();
  formValidators["add"].resetValidation();
});

profileAvatarButton.addEventListener("click", () => {
  avatarPopupForm.open();
  formValidators["avatar"].resetValidation();
});
