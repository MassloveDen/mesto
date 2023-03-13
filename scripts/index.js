const initialCards = [
    {
        name: "Архыз",
        link:
            "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link:
            "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link:
            "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link:
            "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link:
            "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link:
            "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

const popup = document.querySelector(".popup");

const editProfilePopup = document.querySelector(".popup_type_popup-edit-profile");
const addCardPopup = document.querySelector(".popup_type_popup-add-card");
const galleryPopup = document.querySelector(".popup_type_popup-gallery");

const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

// Close buttons
const profileCloseButton = editProfilePopup.querySelector(".popup__close-button");
const cardCloseButton = addCardPopup.querySelector(".popup__close-button");
const galleryCloseButton = galleryPopup.querySelector(".popup__close-button");

// const formElement = document.querySelector(".popup__form");

// Submit buttons
const editProfileForm = document.querySelector(".popup__form_type_edit-profile");
const addCardForm = document.querySelector(".popup__form_type_add-card");

const nameInput = document.querySelector(".popup__input_name");
const jobInput = document.querySelector(".popup__input_job");
const titleInput = document.querySelector(".popup__input_title"); 
const linkInput = document.querySelector(".popup__input_link"); 

const authorName = document.querySelector(".profile__name");
const authorJob = document.querySelector(".profile__job");

// Cards
const listCards = document.querySelector(".elements__list");
const templateCard = document.querySelector(".element-template");

// galleryPopups details
const imagePopupGallery = document.querySelector(".popup__image");
const titlePopupGallery = document.querySelector(".popup__title");


const renderCards = () => {
    const cards = initialCards.map((element) => {
        return createCard(element);
    });
    listCards.append(...cards);
};

const handlerRemove = (event) => {
    event.target.closest(".element").remove();
};

const handlerLike = (event) => {
    event.target.classList.toggle('element__like-button_active');
};

const createCard = (data) => {
    const card = templateCard.cloneNode(true).content;

    const imageCard = card.querySelector(".element__image");
    const captionCard = card.querySelector(".element__figcaption");
    const deleteCardButton = card.querySelector(".element__delete-button");
    const likeButton = card.querySelector(".element__like-button");

    captionCard.textContent = data.name;
    imageCard.src = data.link;
    imageCard.alt = data.name;
    
    imageCard.addEventListener("click", () => handleImagePreview(data));
    deleteCardButton.addEventListener("click", handlerRemove);
    likeButton.addEventListener("click", handlerLike);

    return card;
};

const handleImagePreview = (details) => {
    imagePopupGallery.src = details.link;
    imagePopupGallery.alt = details.name;
    titlePopupGallery.textContent = details.name;

    popupToggle(galleryPopup);
};

renderCards();

function popupToggle(element) {
    element.classList.toggle("popup_opened");
}

function backgroundListener(event) { 
    const popup = event.currentTarget;
    if (event.target !== popup) { 
        return; 
    };

    popupToggle(popup); 
};

// Close popups
editProfilePopup.addEventListener("click", backgroundListener);
addCardPopup.addEventListener("click", backgroundListener);
galleryPopup.addEventListener("click", backgroundListener);

profileCloseButton.addEventListener("click", () => popupToggle(editProfilePopup));
cardCloseButton.addEventListener("click", () => popupToggle(addCardPopup));
galleryCloseButton.addEventListener("click", () => popupToggle(galleryPopup))

// Open popups
profileEditButton.addEventListener("click", () => {
    popupToggle(editProfilePopup);
    if (editProfilePopup.classList.contains("popup_opened")) {
        nameInput.value = authorName.textContent;
        jobInput.value = authorJob.textContent;
    }
});
addCardButton.addEventListener("click", () => {
    popupToggle(addCardPopup);
    titleInput.value = "";
    linkInput.value = "";
});

// Submit handlers
editProfileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    authorName.textContent = nameInput.value;
    authorJob.textContent = jobInput.value;
    popupToggle(editProfilePopup);
});
addCardForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const cardItem = createCard({
        name: titleInput.value,
        link: linkInput.value,
    });
    listCards.prepend(cardItem);
    popupToggle(addCardPopup);
});
