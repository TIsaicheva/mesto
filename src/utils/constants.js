export const defaultCards = [
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

export const formParameters = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__form-error_visible',
    formButton: '.form-button'
};

export const galleryItemsContainerSelector = '.gallery__items';
export const cardTemplateSelector = '.itemTemplate';
export const editPopupSelector = '.popup-edit';
export const editAvatarPopupSelector = '.popup-edit-avatar';
export const addPopupSelector = '.popup-add';
export const imagePopupSelector = '.popup-image';
export const placeImageNameSelector = '.popup__place-name';
export const placeImageUrlSelector = '.popup__image';
export const keyCodeEsc = 'Escape';
export const placeNameInputSelector = '.popup__input_placeName';
export const placeImageInputSelector = '.popup__input_placeImageUrl';
export const userNameSelector = '.profile__info-title';
export const userInfoSelector = '.profile__info-subtitle';
export const nameInputSelector = '.popup__input_userName';
export const descriptInputSelector = '.popup__input_userDescription';
const usePprofile = document.querySelector('.profile');
export const editButton = usePprofile.querySelector('.profile__info-edit-button');
export const addButton = usePprofile.querySelector('.profile__add-button');
export const userAvatarSelector = '.profile__avatar';
export const likeElementSelector = '.item__like-counter';
export const confirmPopupSelector = '.popup-confirm';