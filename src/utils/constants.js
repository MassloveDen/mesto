
export const profileEditPopup = document.querySelector(
    ".popup_type_popup-edit-profile"
);
export const profileEditForm = profileEditPopup.querySelector(
    ".popup__form_type_edit-profile"
);

export const nameInput = profileEditForm.querySelector(".popup__input_name");
export const jobInput = profileEditForm.querySelector(".popup__input_job");

export const profileEditButton = document.querySelector(".profile__edit-button");
export const cardAddButton = document.querySelector(".profile__add-button");
export const profileAvatarButton = document.querySelector(".profile__avatar-edit");

// Cards
export const CARD_ITEM_TEMPLATE_SELECTOR = ".element-template";
export const cardsContainer = document.querySelector(".elements__list");
