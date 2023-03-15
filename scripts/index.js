

const popup = document.querySelector(".popup");

const profileEditPopup = document.querySelector(".popup_type_popup-edit-profile");
const cardAddPopup = document.querySelector(".popup_type_popup-add-card");
const galleryPopup = document.querySelector(".popup_type_popup-gallery");

const profileEditButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");

// Close buttons
const profileCloseButton = profileEditPopup.querySelector(".popup__close-button");
const cardCloseButton = cardAddPopup.querySelector(".popup__close-button");
const galleryCloseButton = galleryPopup.querySelector(".popup__close-button");

// const formElement = document.querySelector(".popup__form");

// Submit buttons
const profileEditForm = document.querySelector(".popup__form_type_edit-profile");
const cardAddForm = document.querySelector(".popup__form_type_add-card");

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
    initialCards.forEach((element) => {
        const card = createCard(element);
        listCards.append(card);
    });
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

function openPopup(element) {
    element.classList.add("popup_opened");
} 

function closePopup(element) {
    element.classList.remove("popup_opened");
} 

function backgroundListener(event) { 
    const popup = event.currentTarget;
    if (event.target !== popup) { 
        return; 
    };

    popupToggle(popup); 
};

// Close popups
profileEditPopup.addEventListener("click", backgroundListener);
cardAddPopup.addEventListener("click", backgroundListener);
galleryPopup.addEventListener("click", backgroundListener);

profileCloseButton.addEventListener("click", () => closePopup(profileEditPopup));
cardCloseButton.addEventListener("click", () => closePopup(cardAddPopup));
galleryCloseButton.addEventListener("click", () => closePopup(galleryPopup))

// Open popups
profileEditButton.addEventListener("click", () => {
    openPopup(profileEditPopup);
    nameInput.value = authorName.textContent;
    jobInput.value = authorJob.textContent;
});
// Спасибо за действительно полезные комментарии, Евгений!
cardAddButton.addEventListener("click", () => {
    openPopup(cardAddPopup);
    cardAddForm.reset();
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
    const cardItem = createCard({
        name: titleInput.value,
        link: linkInput.value,
    });
    listCards.prepend(cardItem);
    closePopup(cardAddPopup);
});

