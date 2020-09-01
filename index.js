
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

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
const card = {name: '', link: ''};

const keyCodeEsc = 'Escape';
const keyCodeEntr = 'Enter';

//находим template по id, получаем его содержимое через content и клонируем всё содержимое
function selectTemplate() {
    return document.querySelector('#itemTemplate').content.cloneNode(true);
}

function getInputValue() {
    card.name = placeNameInput.value;
    card.link = placeImageInput.value;

    return card;
}

function createCard(cardInfo) {
    const galleryItem = selectTemplate();
    galleryItem.querySelector('.item__text').textContent = cardInfo.name;
    galleryItem.querySelector('.item__image').src = cardInfo.link;
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

// закрытие попап кликом на клавишу Enter
function closeByEnter(evt) {
    if (evt.key === keyCodeEntr) {
        closePopup(getOpenedPopup());
    }
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

// закрытие попап при клике на крестик или кнопку Сохранить
function closeByButton(evt) {
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup__submit')) {
        closePopup(getOpenedPopup());
    }
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', overlayPopup);
    popup.addEventListener('click', closeByButton);
    addEventListener('keydown', closePopupByEsc);    
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('click', overlayPopup);
    popup.removeEventListener('click', closeByButton);
    removeEventListener('keydown', closePopupByEsc);
    removeEventListener('keydown', closeByEnter);
}

function editFormSubmitHandler(evt) {
    evt.preventDefault();

    userTitle.textContent = nameInput.value;
    userSubtitle.textContent = descriptInput.value;

    // закрытие попап по клику на Enter
    // addEventListener('keydown', closeByEnter);
}

function addFormSubmitHandler(evt) {
    evt.preventDefault();    
   
    addCardToGallery(getInputValue());
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
