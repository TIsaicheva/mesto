import { Card } from './card.js';
import { defaultCards } from './defaultCards.js';
import { FormValidator } from './FormValidator.js';

const usePprofile = document.querySelector('.profile');
const editButton = usePprofile.querySelector('.profile__info-edit-button');
const addButton = usePprofile.querySelector('.profile__add-button');
const userTitle = usePprofile.querySelector('.profile__info-title');
const userSubtitle = usePprofile.querySelector('.profile__info-subtitle');

// popup-редактирования профиля
const editPopup = document.querySelector('.popup-edit');
const editFormElement = editPopup.querySelector('.popup__form');
const nameInput = editPopup.querySelector('#userName');
const descriptInput = editPopup.querySelector('#userDescription');

// popup-добавления карточки
const addPopup = document.querySelector('.popup-add');
const addFormElement = addPopup.querySelector('.popup__form');
const placeNameInput = addPopup.querySelector('#placeName');
const placeImageInput = addPopup.querySelector('#placeImageUrl');

// popup-картинки
const imagePopup = document.querySelector('.popup-image');
const image = imagePopup.querySelector('.popup_image');
const placeName = imagePopup.querySelector('.popup__place-name');
const placeImageUrl = imagePopup.querySelector('.popup__image');

const galleryItemsContainer = document.querySelector('.gallery__items');
const cardValues = { name: '', link: '' };

const keyCodeEsc = 'Escape';
const cardTemplateSelector = '.itemTemplate';

const formParameters = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__form-error_visible'
};

function getInputValues() {
    cardValues.name = placeNameInput.value;
    cardValues.link = placeImageInput.value;

    return cardValues;
}

function createCard() {
    const card = new Card(getInputValues(), cardTemplateSelector);
    const newCard = card.generate();
    addCardToGallery(newCard);
}

function addCardToGallery(card) {
    galleryItemsContainer.prepend(card);
}

defaultCards.forEach((defaultCard) => {
    const card = new Card(defaultCard, cardTemplateSelector);
    const cardElement = card.generate();

    addCardToGallery(cardElement);
});

// найти открытый попап
function getOpenedPopup() {
    return document.querySelector('.popup_opened');
}

// закрытие попап кликом на клавишу Escape
function closePopupByEsc(evt) {
    if (evt.key === keyCodeEsc) {
        closePopup(getOpenedPopup());
    }
}

// закрытие попап кликом на оверлей
function overlayPopup(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(getOpenedPopup());
    }
}

// закрытие попап при клике на иконку 'крестик'
function pressCloseIcon(evt) {
    if (evt.target.classList.contains('popup__close')) {
        closePopup(getOpenedPopup());
    }
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', overlayPopup);
    popup.addEventListener('click', pressCloseIcon);
    addEventListener('keydown', closePopupByEsc);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('click', overlayPopup);
    popup.removeEventListener('click', pressCloseIcon);
    removeEventListener('keydown', closePopupByEsc);
}

function editFormSubmitHandler(evt) {
    evt.preventDefault();

    userTitle.textContent = nameInput.value;
    userSubtitle.textContent = descriptInput.value;

    closePopup(getOpenedPopup());
}

function addFormSubmitHandler(evt) {
    evt.preventDefault();

    createCard();
    closePopup(getOpenedPopup());
}

// отслеживаем клик по кнопке edit профайл
// открываем popup-редактирования профиля
// копируем данные из input-полей на страницу
editButton.addEventListener('click', function () {
    openPopup(editPopup);

    nameInput.value = userTitle.textContent;
    descriptInput.value = userSubtitle.textContent;

    const editFormValidator = new FormValidator(formParameters, editPopup.querySelector(formParameters.formSelector));
    editFormValidator.enableValidation();
});

// отслеживаем клик по кнопке add
// открываем popup-добавления карточки
addButton.addEventListener('click', function () {
    openPopup(addPopup);

    placeNameInput.value = '';
    placeImageInput.value = '';

    const addFormValidator = new FormValidator(formParameters, addPopup.querySelector(formParameters.formSelector));
    addFormValidator.enableValidation();
});

editFormElement.addEventListener('submit', editFormSubmitHandler);
addFormElement.addEventListener('submit', addFormSubmitHandler);

function renderImage(evt) {
    // вствляем изображение картинки, по которой кликнули в popup-картинки
    placeImageUrl.src = evt.target.src;
    // вствляем название картинки, по которой кликнули в popup-картинки
    placeName.textContent = evt.target.nextElementSibling.textContent;
}

galleryItemsContainer.addEventListener('click', (evt) => {
    const target = evt.target.classList;
    if (target.contains('item__image')) {
        openPopup(imagePopup);
        renderImage(evt);
    }
});