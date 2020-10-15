export default class Card {
    constructor({ name, link, owner }, cardSelector, { handleCardClick, handleLikeClick, handleDeleteIconClick }) {
        this._cardSelector = cardSelector;
        this._cardName = name;
        this._cardLinkImage = link;
        this.handleCardClick = handleCardClick;
        this.handleLikeClick = handleLikeClick;
        this.handleDeleteIconClick = handleDeleteIconClick;
        this._ownerId = owner._id;
        this._liked = false;
        this._likeBtn = '';
    }

    _getTemplate() {
        const cardTemplate = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.item')
            .cloneNode(true);

        return cardTemplate;
    }

    _isOwner(id) {
        if (id === this._ownerId) {
            return true;
        } else return false
    }

    _renderDeleteIcon(id) {
        if (this._isOwner(id)) {
            const deleteIcon = this._cardItem.querySelector('.item__delete');
            deleteIcon.classList.remove('item__delete_none');
        }
    }

    generate(userId) {
        this._cardItem = this._getTemplate();

        this._cardItem.querySelector('.item__image').src = this._cardLinkImage;
        this._cardItem.querySelector('.item__text').textContent = this._cardName;

        this._renderDeleteIcon(userId);

        // устанавливается слушатель событий для каждой сгенерированной карточки
        this._setEventListeners();

        return this._cardItem;
    }

    _like(btnElement) {
        btnElement.classList.add('item__like-icon_active');
    }

    _unlike(btnElement) {
        btnElement.classList.remove('item__like-icon_active');
    }

    delete() {
        this._cardItem.remove();
        this._cardItem = null;
    }

    _isUserLiked(data, id) {
        return data.likes.some((like) => {
            return like._id === id;
        })
    }

    renderLikes(data, card, elementSelector, flag, userId) {            
        const likeElement = card.querySelector(elementSelector);        
        if (!this._isUserLiked(data, userId) && !this._liked) {
            likeElement.textContent = data.likes.length;
        } else if (this._isUserLiked(data, userId) && !this._liked && !flag) {           
            likeElement.textContent = data.likes.length;
            this._like(this._likeBtn);
        } else if (this._liked && flag) {           
            likeElement.textContent = data.likes.length;
            this._unlike(this._likeBtn);
        }
    }
   
    isLiked() {
        if(this._likeBtn.classList.contains('item__like-icon_active')) {
            this._liked = true;
            return true;
        } else {
            this._liked = false;
            return false;
        }
    }

    _setEventListeners() {
        this._cardItem.querySelector('.item__delete').addEventListener('click', () => {
            this.handleDeleteIconClick();
        })

        this._likeBtn = this._cardItem.querySelector('.item__like-icon');
        this._likeBtn.addEventListener('click', () => {
            this.handleLikeClick();
        })

        this._cardItem.querySelector('.item__image').addEventListener('click', (evt) => {
            this.handleCardClick(this._cardName, this._cardLinkImage);
        })
    }
}