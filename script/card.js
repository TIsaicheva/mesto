export class Card {
    constructor(data, cardSelector) {
        this._cardSelector = cardSelector;
        this._cardName = data.name;
        this._cardLinkImage = data.link;
    }

    _getTemplate() {
        const cardTemplate = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.item')
            .cloneNode(true);

        return cardTemplate;
    }

    generate() {
        this._cardItem = this._getTemplate();

        this._cardItem.querySelector('.item__image').src = this._cardLinkImage;
        this._cardItem.querySelector('.item__text').textContent = this._cardName;

        // устанавливается слушатель событий для каждой сгенерированной карточки
        this._setEventListeners();

        return this._cardItem;
    }

    _like(evt) {
        evt.target.classList.toggle('item__like-icon_active');
    }

    _delete() {
        this._cardItem.remove();
    }

    _setEventListeners() {
        this._cardItem.addEventListener('click', (evt) => {
            const target = evt.target.classList;
            if (target.contains('item__delete')) {
                this._delete();
            } else if (target.contains('item__like-icon')) {
                this._like(evt);
            }
        });
    }
}