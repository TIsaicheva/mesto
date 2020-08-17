
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

initialCards.forEach(addCardToGallery);

function popupToggle(popup) {
    popup.classList.toggle('popup_opened');
}

function editFormSubmitHandler(evt) {
    evt.preventDefault();

    userTitle.textContent = nameInput.value;
    userSubtitle.textContent = descriptInput.value;

    popupToggle(editPopup);
}

function addFormSubmitHandler(evt) {
    evt.preventDefault();
    const card = {
        name: '',
        link: ''
    }

    card.name = placeNameInput.value;
    card.link = placeImageInput.value;   

    addCardToGallery(card);
    popupToggle(addPopup);   
}

// отслеживаем клик по кнопке edit профайл
// открываем popup-редактирования профиля
// копируем данные из input-полей на страницу
editButton.addEventListener('click', function(){    
    popupToggle(editPopup);
    nameInput.value = userTitle.textContent;
    descriptInput.value = userSubtitle.textContent;
});
// отслеживаем клик по кнопке add
// открываем popup-добавления карточки
addButton.addEventListener('click', function(){
    popupToggle(addPopup);
    placeNameInput.value = '';
    placeImageInput.value = '';
});
formElement.addEventListener('submit', editFormSubmitHandler);
addFormElement.addEventListener('submit', addFormSubmitHandler);

// находим все popup-окна
// у каждого popup-окна находим кнопку с классом popup__close
// каждой кнопке закрытия popup-окна устанавливаем addEventListener
const popups = document.querySelectorAll('.popup');
popups.forEach(popup => {
    popup.querySelector('.popup__close').addEventListener('click', function(){
        popupToggle(popup);
    })
});

galleryItemsContainer.addEventListener('click', function(evt){
    const target = evt.target.classList;    
    if(target.contains('item__delete')){        
        deleteItem(evt);
    } else if(target.contains('item__like-icon')){
        likeImage(evt);
    } else if(target.contains('item__image')) {
        popupToggle(imagePopup);
        renderPopupImage(evt)
    }
});

// поставить лайк карточке в галлерее
function likeImage(evt){
    evt.target.classList.toggle('item__like-icon_active');
}

// удалить карточку из галлереи
function deleteItem(evt){
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