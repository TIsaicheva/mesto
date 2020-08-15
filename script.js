
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
let userTitle = usePprofile.querySelector('.profile__info-title');
let userSubtitle = usePprofile.querySelector('.profile__info-subtitle');

// popup-редактирования профиля
const popup = document.querySelector('.popup');
const formElement = popup.querySelector('.popup__form');
let nameInput = popup.querySelector('#userName');
let descriptInput = popup.querySelector('#userDescription');
// popup-добавления карточки
const addPopup = document.querySelector('.add');
const addFormElement = addPopup.querySelector('.popup__form');
let placeNameInput = addPopup.querySelector('#placeName');
let placeImageInput = addPopup.querySelector('#placeImageUrl');

// popup-картинки
const imagePopup = document.querySelector('.popup-image');
const image = imagePopup.querySelector('.popup_image');
const placeName = imagePopup.querySelector('.popup__place-name');
const placeImageUrl = imagePopup.querySelector('.popup__image');

const galleryItemsContainer = document.querySelector('.gallery__items');

function selectTemplate() {
    //находим template по id, получаем его содержимое через content и клонируем всё содержимое в переменную
    return document.querySelector('#itemTemplate').content.cloneNode(true);     
}

const addCardToGallery = el => {       
    const galleryItem = selectTemplate();
    galleryItem.querySelector('.item__text').textContent = el.name;
    galleryItem.querySelector('.item__image').src = el.link;

    galleryItemsContainer.prepend(galleryItem);
};

const openPopupImage = evt => {    
    // вствляем изображение картинки, по которой кликнули в popup-картинки
    placeImageUrl.src = evt.target.src;    
    // вствляем название картинки, по которой кликнули в popup-картинки
    placeName.textContent = evt.target.nextElementSibling.textContent;    
};

initialCards.forEach(addCardToGallery);

function popupToggle(evt) {    
    const targetPopup = evt.target.classList[0];    
    targetPopupParent = evt.target.parentElement.parentElement;    

    switch (targetPopup) {
        case 'profile__info-edit-button':
            // открытие popup-редактирования профиля           
            popup.classList.toggle('popup_opened');
            nameInput.value = userTitle.textContent;
            descriptInput.value = userSubtitle.textContent;
            break;
        case 'profile__add-button':
            // открытие popup-добавления карточки   
            addPopup.classList.toggle('popup_opened');
            break;
        case 'popup__form':
            // закрытие popup-редактирования профиля, при нажатии кнопки Сохранить
            // закрытие popup-добавления карточки, при нажатии кнопки Сохранить
            if (targetPopupParent.classList.contains('add')) {
                addPopup.classList.toggle('popup_opened');
            } else popup.classList.toggle('popup_opened');
            break;
        case 'popup__close':
            if (targetPopupParent.classList.contains('add')) {
                // закрытие popup-добавления карточки 
                addPopup.classList.toggle('popup_opened');
            } else if (targetPopupParent.classList.contains('popup-image')) {
                // закрытие popup-картинки 
                imagePopup.classList.toggle('popup_opened');
            } else
                // закрытие popup-редактирования профиля
                popup.classList.toggle('popup_opened');
            break;
        case 'item__image':
            // открытие popup-картинки   
            imagePopup.classList.toggle('popup_opened');
            openPopupImage(evt);        
            break;
    }
}

function editFormSubmitHandler(evt) {
    evt.preventDefault();

    userTitle.textContent = nameInput.value;
    userSubtitle.textContent = descriptInput.value;

    popupToggle(evt);
}

function addFormSubmitHandler(evt) {
    evt.preventDefault();
    const card = {
        name: '',
        link: ''
    }

    card.name = placeNameInput.value;
    card.link = placeImageInput.value;

    // проверить, что поля не пустые
    if (card.name.length > 0 && card.link.length > 0) {
        addCardToGallery(card);
    }

    popupToggle(evt);
}

editButton.addEventListener('click', popupToggle);
addButton.addEventListener('click', popupToggle);
formElement.addEventListener('submit', editFormSubmitHandler);
addFormElement.addEventListener('submit', addFormSubmitHandler);

// выбираем все кнопки закрытия popup
// ищем среди них кнопку, у которой ближайший родитель имеет класс add
// устанавливаем на нужной кнопке addEventListener
document.querySelectorAll('.popup__close').forEach(el => {
    if (el.parentElement.parentElement.classList.contains('add')) {
        el.addEventListener('click', popupToggle);
    } else el.addEventListener('click', popupToggle);
});

document.addEventListener('click', event => {
    // отслеживаем по какой кнопке был клик
    const target = event.target;

    // добавляем класс active иконке like
    if (target.classList.contains('item__like-icon')) {
        target.classList.toggle('item__like-icon_active');
    } else if (target.classList.contains('item__delete')) {
        // выбираем елемент, который нужно удалить
        const deleteItem = event.target.closest('.item');

        deleteItem.remove();
    } else if (target.classList.contains('item__image')) {        
        popupToggle(event);
    }

});
