export class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._cardTitle = this._element.querySelector(".element__figcaption");
    this._cardLink = this._element.querySelector(".element__image");
    this._cardLikeButton = this._element.querySelector(".element__like-button");
    this._cardDeleteButton = this._element.querySelector(".element__delete-button");
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

    return this._element;
  }

  _setEventListeners() {
    this._cardLink.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    this._cardLikeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });

    this._cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteButton();
    });
  }

  _handleLikeButton() {
    this._cardLikeButton.classList.toggle("element__like-button_active");
  }

  _handleDeleteButton() {
    this._element.remove();
    this._element = null;
  }
}
