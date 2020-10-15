import './index.css';
import Api from '../components/api.js'
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';
import {
    galleryItemsContainerSelector,
    defaultCards,
    cardTemplateSelector,
    editPopupSelector,
    addPopupSelector,
    editAvatarPopupSelector,
    imagePopupSelector,
    userNameSelector,
    userInfoSelector,
    nameInputSelector,
    descriptInputSelector,
    formParameters,
    editButton,
    addButton,
    userAvatarSelector,
    placeImageNameSelector,
    placeImageUrlSelector,
    likeElementSelector,
    confirmPopupSelector
} from '../utils/constants.js';
const editUserProfile = new UserInfo({ userNameSelector, userInfoSelector });
const popupImage = new PopupWithImage(imagePopupSelector, placeImageNameSelector, placeImageUrlSelector);
const renderUserInfo = new UserInfo({ userNameSelector, userInfoSelector, userAvatarSelector });
let isArray = '';
let creatorId = '';
const baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-16';

const api = new Api({
    baseUrl: baseUrl,
    headers: {
        authorization: '075722c7-326f-4e9c-9498-630fe730cec9',
        'Content-Type': 'application/json'
    }
});

const initialCards = api.getInitialCards();
const userInfo = api.getUserInfo();
const editAvatarElement = document.querySelector(userAvatarSelector);

/* отображение на странице данных пользователя, полученных с сервера */
userInfo
    .then((data) => {
        renderUserInfo.setUserInfo(data);
        renderUserInfo.setAvatar(data);
        /* сохраняется id пользователя текущей страницы */
        creatorId = data._id;
    })
    .catch((err) => console.log(err));

function createCardElement(item) {
    const card = new Card(item, cardTemplateSelector,
        {
            /* обработка клика по карточке для увеличения изображения*/
            handleCardClick: (cardName, cardLinkImage) => {
                popupImage.open(cardName, cardLinkImage);
            },
            /* обработка клика по иконке удаления карточки*/
            handleDeleteIconClick: () => {
                const popup = new PopupWithConfirm({
                    formSubmitHandler: (evt) => {
                        if (popup.confirmAction(evt)) {
                            api.deleteCard(item)
                                .then(() => {
                                    card.delete();
                                })
                                .catch((err) => console.log(err));
                        }
                        popup.close();
                    }
                }, confirmPopupSelector);
                popup.open();
            },
            /* обработка клика по иконке лайка карточки*/
            handleLikeClick: () => {
                if (card.isLiked()) {
                    api
                        .unLikeCard(item)
                        .then((data) => {
                            card.renderLikes(data, cardElement, likeElementSelector, true, creatorId);
                        })
                        .catch((err) => console.log(err));
                } else {
                    api
                        .likeCard(item)
                        .then((data) => {
                            card.renderLikes(data, cardElement, likeElementSelector, false, creatorId);
                        })
                        .catch((err) => console.log(err));
                }
            }
        });
    const cardElement = card.generate(creatorId);
    card.renderLikes(item, cardElement, likeElementSelector, false, creatorId);
    return cardElement;
}

/* отображение на странице карточек, полученных с сервера */
initialCards
    .then((data) => {
        const defaultCardList = new Section(
            {
                items: data,
                renderer: (item) => {
                    isArray = true;
                    defaultCardList.addItem(createCardElement(item), isArray);
                }
            }, galleryItemsContainerSelector
        );
        defaultCardList.renderItems();
    })
    .catch((err) => console.log(err));

/* устанавливается слушатель на форму добавления карточки
создаётся карточка и добавляется на страницу */
const addFormSubmitHandler = new PopupWithForm(
    {
        formSubmitHandler: (formData) => {
            addFormSubmitHandler.renderLoading(true);
            api
                .addCard({ name: formData.name, link: formData.link })
                .then((data) => {
                    const addCardItem = new Section(
                        {
                            items: [data],
                            renderer: (item) => {
                                isArray = false;
                                addCardItem.addItem(createCardElement(item), isArray);
                            }
                        }, galleryItemsContainerSelector
                    );
                    addCardItem.renderItems();
                })
                .catch((err) => console.log(err))
                .finally(() => {
                    addFormSubmitHandler.renderLoading(false);
                });
            addFormSubmitHandler.close();
        }
    }, addPopupSelector
);

/* 
устанавливается слушатель на форму редактирования профиля
данные из формы редактирования отправляются на сервер,
а потом добавляются на страницу 
*/
const editFormSubmitHandler = new PopupWithForm(
    {
        formSubmitHandler: (formData) => {
            editFormSubmitHandler.renderLoading(true);
            api
                .editUserInfo({ name: formData.userName, about: formData.userDescription })
                .then((data) => {
                    renderUserInfo.setUserInfo(data);
                })
                .catch((err) => console.log(err))
                .finally(() => {
                    editFormSubmitHandler.renderLoading(false);
                });
            editFormSubmitHandler.close();
        }
    }, editPopupSelector
);

/* 
устанавливается слушатель на форму редактирования аватара
данные из формы редактирования отправляются на сервер,
а потом добавляются на страницу 
*/
const editAvatarSubmitHandler = new PopupWithForm(
    {
        formSubmitHandler: (formData) => {
            editAvatarSubmitHandler.renderLoading(true);
            api
                .changeAvatar({ avatar: formData.url })
                .then((data) => {
                    renderUserInfo.setAvatar(data);
                })
                .catch((err) => console.log(err))
                .finally(() => {
                    editAvatarSubmitHandler.renderLoading(false);
                });
            editAvatarSubmitHandler.close();
        }
    }, editAvatarPopupSelector
);

addFormSubmitHandler.setEventListeners();
editFormSubmitHandler.setEventListeners();
editAvatarSubmitHandler.setEventListeners();

/* отслеживается клик по кнопке edit профайл
 создаётся экземпляр класса Popup для открытия popup-редактирования профиля
 данные пользователя со страницы подставляются в форму редактирования 
 */
editButton.addEventListener('click', function () {
    const popup = new PopupWithForm({ formSubmitHandler: () => { } }, editPopupSelector);
    popup.open();
    const nameInput = document.querySelector(nameInputSelector);
    const descriptInput = document.querySelector(descriptInputSelector);
    const { name, description } = editUserProfile.getUserInfo();

    nameInput.value = name;
    descriptInput.value = description;
});

/* отслеживается клик по кнопке add
 создаётся экземпляр класса Popup для открытия popup-добавления карточки */
addButton.addEventListener('click', function () {
    const popup = new PopupWithForm({ formSubmitHandler: () => { } }, addPopupSelector);
    popup.open();
});

/* отслеживается клик по элементу аватара пользователя
 создаётся экземпляр класса Popup для открытия popup-редактирования аватара */
editAvatarElement.addEventListener('click', function () {
    const popup = new PopupWithForm({ formSubmitHandler: () => { } }, editAvatarPopupSelector);
    popup.open();
})

/* Валидация формы редактирования */
const editPopupForm = document.querySelector(editPopupSelector).querySelector(formParameters.formSelector);
const editFormValidator = new FormValidator(formParameters, editPopupForm);
editFormValidator.enableValidation();

/* Валидация формы добавления карточки */
const addPopupForm = document.querySelector(addPopupSelector).querySelector(formParameters.formSelector);
const addFormValidator = new FormValidator(formParameters, addPopupForm);
addFormValidator.enableValidation();