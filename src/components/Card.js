export class Card {
  constructor(
    cardData,
    userId,
    templateSelector,
    { handleCardClick, handleLikeClick, handleDeleteClick }
  ) {
    this.initialCards = cardData;
    this._name = this.cardData.name;
    this._link = this.cardData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._ownerId = item.owner._id;
    this._cardId = this.initialCards._id;
    this._cardOwnerId = this.initialCards.owner._id;
    this._handleDeleteClick = handleDeleteClick;
    this._likes = this.initialCards.likes;
    this._handleLikeClick = handleLikeClick;
    this._element = this._getTemplate();
    this._cardTitle = this._element.querySelector(".element__figcaption");
    this._cardLink = this._element.querySelector(".element__image");
    this._cardLikeButton = this._element.querySelector(".element__like-button");
    this._cardDeleteButton = this._element.querySelector(
      ".element__delete-button"
    );
    this._cardLikeNumber = this._element.querySelector(".element__number");
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._cardTitle.textContent = this._name;
    this._cardLink.src = this._link;
    this._cardLink.alt = this._name;

    this._setEventListeners();
    this.renderLikes();

    if (this._ownerId !== this._userId) {
      this._cardDeleteButton.remove();
    }

    return this._element;
  }

  renderLikes() {
    this._cardLikeNumber.textContent = this._likes.length;
    this.switchLikes();
  }

  defineLikes() {
    return this._likes.some((like) => like._id === this._userId);
  }

  switchLikes() {
    if (this.defineLikes()) {
      this._cardLikeButton.classList.add("element__like-button_active");
    } else {
      this._cardLikeButton.classList.remove("element__like-button_active");
    }
  }

  setLikes(initialCards) {
    this._likes = initialCards.likes;
    this._cardLikeNumber.textContent = this._likes.length;
    this._handleLikeButton();
  }

  _handleLikeButton() {
    this._cardLikeButton.classList.toggle("element__like-button_active");
  }

  _handleDeleteButton() {
    if (this._cardOwnerId !== this._userId) {
      this._cardDeleteButton.remove();
    }
  }

  getCardId() {
    return this._cardId;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._cardLink.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    this._cardLikeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    this._cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteButton();
    });
  }
}
