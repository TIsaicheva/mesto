import './index.css';
import Api from '../components/api.js'
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';
import {
    galleryItemsContainerSelector,
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
const editAvatarElement = document.querySelector(userAvatarSelector);
let creatorId = '';
const baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-16';

const api = new Api({
    baseUrl: baseUrl,
    headers: {
        authorization: '075722c7-326f-4e9c-9498-630fe730cec9',
        'Content-Type': 'application/json'
    }
});

function openPopup(selector) {
    const popup = new PopupWithForm({ formSubmitHandler: () => { } }, selector);
    popup.open();
    popup.setEventListeners();
}

function validationForm(popupSelector) {
    const popupForm = document.querySelector(popupSelector).querySelector(formParameters.formSelector);
    const vormValidator = new FormValidator(formParameters, popupForm);
    vormValidator.enableValidation();
}

function createCardElement(item) {
    const card = new Card(item, cardTemplateSelector,
        {
            /* обработка клика по карточке для увеличения изображения*/
            handleCardClick: (cardName, cardLinkImage) => {
                popupImage.open(cardName, cardLinkImage);
                popupImage.setEventListeners();
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
                                .then(() => {
                                    popup.close();
                                })
                                .catch((err) => console.log(err));
                        }
                    }
                }, confirmPopupSelector);
                popup.open();
                popup.setEventListeners();
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

function addCard(data, selector, flag) {
    const cardElem = new Section(
        {
            items: data,
            renderer: (item) => {
                cardElem.addItem(createCardElement(item), flag);
            }

        }, selector);
    cardElem.renderItems();
}

Promise.all(
    [
        api.getUserInfo(),
        api.getInitialCards()
    ])
    .then((values) => {
        const [userInfo, initialCards] = values;

        /* выполняется код для вывода на страницу
        информации о пользователе*/
        renderUserInfo.setUserInfo(userInfo);
        renderUserInfo.setAvatar(userInfo);
        /* сохраняется id пользователя текущей страницы */
        creatorId = userInfo._id;

        /* выполняется код для вывода на страницу
        карточек с сервера*/
        addCard(initialCards, galleryItemsContainerSelector, true);
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
                    addCard([data], galleryItemsContainerSelector, false);
                })
                .then(() => {
                    addFormSubmitHandler.close();
                })
                .catch((err) => console.log(err))
                .finally(() => {
                    addFormSubmitHandler.renderLoading(false);
                });
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
                .then(() => {
                    editFormSubmitHandler.close();
                })
                .catch((err) => console.log(err))
                .finally(() => {
                    editFormSubmitHandler.renderLoading(false);
                });
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
                .then(() => {
                    editAvatarSubmitHandler.close();
                })
                .catch((err) => {
                    console.log(err);
                    validationForm(editAvatarPopupSelector);
                })
                .finally(() => {
                    editAvatarSubmitHandler.renderLoading(false);
                });
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
    openPopup(editPopupSelector);
    const nameInput = document.querySelector(nameInputSelector);
    const descriptInput = document.querySelector(descriptInputSelector);
    const { name, description } = editUserProfile.getUserInfo();

    nameInput.value = name;
    descriptInput.value = description;
});

/* отслеживается клик по кнопке add
 создаётся экземпляр класса Popup для открытия popup-добавления карточки */
addButton.addEventListener('click', function () {
    openPopup(addPopupSelector);
});

/* отслеживается клик по элементу аватара пользователя
 создаётся экземпляр класса Popup для открытия popup-редактирования аватара */
editAvatarElement.addEventListener('click', function () {
    openPopup(editAvatarPopupSelector);
})

/* Валидация формы редактирования */
validationForm(editPopupSelector);

/* Валидация формы добавления карточки */
validationForm(addPopupSelector);