export class Card {
  constructor(initialCards, templateSelector, handleCardClick) {
    this._name = initialCards.name;
    this._link = initialCards.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
    
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardTitle = this._element.querySelector(".element__figcaption");
    const cardLink = this._element.querySelector(".element__image");
    const cardLinkAlt = this._element.querySelector(".element__image");
    const cardLikeButton = this._element.querySelector('.element__like-button');
    const cardDeleteButton = this._element.querySelector('.element__delete-button');
    
    cardTitle.textContent = this._name;
    cardLink.src = this._link;
    cardLinkAlt.alt = this._name;

    this._setEventListeners(cardLink, cardLikeButton, cardDeleteButton);
  
    return this._element;
  }

  _setEventListeners(cardLink, cardLikeButton, cardDeleteButton) {
    cardLink.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    cardLikeButton.addEventListener('click', () => {
      this._handleLikeButton(cardLikeButton);
    });

    cardDeleteButton.addEventListener('click', () => {
      this._handleDeleteButton();
    })
  }

  _handleLikeButton (cardLikeButton) {
    cardLikeButton.classList.toggle('element__like-button_active');
  }
  
  _handleDeleteButton () {
    this._element.remove();
    this._element = null;
  }

}
