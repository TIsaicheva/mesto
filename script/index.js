
const usePprofile = document.querySelector('.profile');
const editButton = usePprofile.querySelector('.profile__info-edit-button');
const addButton = usePprofile.querySelector('.profile__add-button');
const userTitle = usePprofile.querySelector('.profile__info-title');
const userSubtitle = usePprofile.querySelector('.profile__info-subtitle');

// popup-редактирования профиля
const editPopup = document.querySelector('.popup-edit');
const formElement = editPopup.querySelector('.popup__form');
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
const card = { name: '', link: '' };

const keyCodeEsc = 'Escape';
const keyCodeEntr = 'Enter';
const parameters = formParameters;

function getAddCardValues() {
    card.name = placeNameInput.value;
    card.link = placeImageInput.value;

    return card;
}

function createCard(cardValues) {
    //находим template по id, получаем его содержимое через content и клонируем всё содержимое
    const galleryItem = document.querySelector('#itemTemplate').content.cloneNode(true);
    galleryItem.querySelector('.item__text').textContent = cardValues.name;
    galleryItem.querySelector('.item__image').src = cardValues.link;

    return galleryItem;
}

function addCardToGallery(card) {
    galleryItemsContainer.prepend(createCard(card));
};

initialCards.forEach(addCardToGallery);

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

function hidePopupError(popupElement) {
    const popupTextError = popupElement.querySelectorAll('.popup__form-error');
    const popupInputError = popupElement.querySelectorAll('.popup__input');

    popupTextError.forEach((textError) => {
        textError.textContent = '';
    })

    popupInputError.forEach((inputError) => {
        inputError.classList.remove('popup__input_type_error');
    });
}

// disable кнопку submit при каждом открытии popup 
function disableBtn(popup) {
    const popupInputList = Array.from(popup.querySelectorAll('.popup__input'));
    const submitBtn = popup.querySelector('.popup__submit');
    toggleButtonState(popupInputList, submitBtn, parameters);
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    disableBtn(popup);
    popup.addEventListener('click', overlayPopup);
    popup.addEventListener('click', pressCloseIcon);
    addEventListener('keydown', closePopupByEsc);
}

function closePopup(popup) {
    hidePopupError(popup);
    popup.classList.remove('popup_opened');
    popup.removeEventListener('click', overlayPopup);
    popup.removeEventListener('click', pressCloseIcon);
    removeEventListener('keydown', closePopupByEsc);
    addFormElement.reset();
}

function editFormSubmitHandler(evt) {
    evt.preventDefault();

    userTitle.textContent = nameInput.value;
    userSubtitle.textContent = descriptInput.value;

    closePopup(getOpenedPopup());
}

function addFormSubmitHandler(evt) {
    evt.preventDefault();

    addCardToGallery(getAddCardValues());
    closePopup(getOpenedPopup());
}

// отслеживаем клик по кнопке edit профайл
// открываем popup-редактирования профиля
// копируем данные из input-полей на страницу
editButton.addEventListener('click', function () {
    openPopup(editPopup);

    nameInput.value = userTitle.textContent;
    descriptInput.value = userSubtitle.textContent;
});

// отслеживаем клик по кнопке add
// открываем popup-добавления карточки
addButton.addEventListener('click', function () {
    openPopup(addPopup);

    placeNameInput.value = '';
    placeImageInput.value = '';
});

formElement.addEventListener('submit', editFormSubmitHandler);
addFormElement.addEventListener('submit', addFormSubmitHandler);

// слушатель события 'click' на галерее с карточками
galleryItemsContainer.addEventListener('click', function (evt) {
    const target = evt.target.classList;
    if (target.contains('item__delete')) {
        deleteItem(evt);
    } else if (target.contains('item__like-icon')) {
        likeImage(evt);
    } else if (target.contains('item__image')) {
        openPopup(imagePopup);
        renderPopupImage(evt)
    }
});

// поставить лайк карточке в галлерее
function likeImage(evt) {
    evt.target.classList.toggle('item__like-icon_active');
}

// удалить карточку из галлереи
function deleteItem(evt) {
    const delItem = evt.target.closest('.item');

    delItem.remove();
}

// открыть изображение карточки
function renderPopupImage(evt) {
    // вствляем изображение картинки, по которой кликнули в popup-картинки
    placeImageUrl.src = evt.target.src;
    // вствляем название картинки, по которой кликнули в popup-картинки
    placeName.textContent = evt.target.nextElementSibling.textContent;
};
