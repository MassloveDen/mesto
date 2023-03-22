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

const saveButton = document.querySelector(".popup__save-button");

const formElement = document.querySelector(".popup__form");
// const buttonElement = document.querySelector(".popup__save-button");
const popupSaveButton = cardAddPopup.querySelector(".popup__save-button");
// const inactiveButtonClass = (".popup__save-button");

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
    const card = templateCard.content.cloneNode(true);

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

    openPopup(galleryPopup);
};

renderCards();

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
        const popupOpened = document.querySelector(".popup_opened");
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
    saveButton.classList.add("popup__save-button_invalid");
    nameInput.value = authorName.textContent;
    console.log(nameInput.value);
    jobInput.value = authorJob.textContent;
    console.log(jobInput.value);

});

cardAddButton.addEventListener("click", (e) => {
    console.log(e.target);
    openPopup(cardAddPopup);
    // toggleButtonState(formElement, buttonElement, inactiveButtonClass);
    disableButtonSubmit(popupSaveButton);
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

