import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import {
    galleryItemsContainerSelector,
    defaultCards,
    cardTemplateSelector,
    editPopupSelector,
    addPopupSelector,
    imagePopupSelector,
    userNameSelector,
    userInfoSelector,
    nameInputSelector,
    descriptInputSelector,
    formParameters,
    editButton,
    addButton    
} from '../utils/constants.js';

// отображение на странице карточек по умолчанию
const defaultCardList = new Section(
    {
        items: defaultCards,
        renderer: (item) => {
            const card = new Card(item, cardTemplateSelector, {
                handleCardClick: (evt) => {
                    const addPopupImage = new PopupWithImage(imagePopupSelector);
                    addPopupImage.open(evt.target);
                }
            });
            const cardElement = card.generate();
            defaultCardList.addItem(cardElement);
        }
    }, galleryItemsContainerSelector
);
defaultCardList.renderItems();

// устанавливается слушатель на форму добавления карточки
// создаётся карточка и добавляется на страницу 
const addFormSubmitHandler = new PopupWithForm(
    {
        formSubmitHandler: (formData) => {
            const addCardItem = new Section(
                {
                    items: [formData],
                    renderer: (item) => {
                        const card = new Card(item, cardTemplateSelector, {
                            handleCardClick: (evt) => {
                                const addPopupImage = new PopupWithImage(imagePopupSelector);
                                addPopupImage.open(evt.target);
                            }
                        });
                        const cardElement = card.generate();
                        addCardItem.addItem(cardElement);
                    }
                }, galleryItemsContainerSelector
            );
            addCardItem.renderItems();
            addFormSubmitHandler.close();
        }
    }, addPopupSelector
);

// устанавливается слушатель на форму редактирования профиля
// данные из формы редактирования добавляются на страницу 
const editFormSubmitHandler = new PopupWithForm(
    {
        formSubmitHandler: (formData) => {
            const editUserProfile = new UserInfo({ userNameSelector, userInfoSelector });
            editUserProfile.setUserInfo(formData);
            editFormSubmitHandler.close();
        }
    }, editPopupSelector
);

addFormSubmitHandler.setEventListeners();
editFormSubmitHandler.setEventListeners();

// отслеживается клик по кнопке edit профайл
// создаётся экземпляр класса Popup для открытия popup-редактирования профиля
// данные пользователя со страницы подставляются в форму редактирования
editButton.addEventListener('click', function () {
    const popup = new Popup(editPopupSelector);
    popup.open();
    const nameInput = document.querySelector(nameInputSelector);
    const descriptInput = document.querySelector(descriptInputSelector);
    const userInfo = new UserInfo({ userNameSelector, userInfoSelector });    
    const {name, description} = userInfo.getUserInfo();
    
    nameInput.value = name;
    descriptInput.value = description;
});

// отслеживается клик по кнопке add
// создаётся экземпляр класса Popup для открытия popup-добавления карточки
addButton.addEventListener('click', function () {
    const popup = new Popup(addPopupSelector);
    popup.open();
});

// Валидация формы редактирования
const editPopupForm = document.querySelector(editPopupSelector).querySelector(formParameters.formSelector);
const editFormValidator = new FormValidator(formParameters, editPopupForm);
editFormValidator.enableValidation();

// Валидация формы добавления карточки
const addPopupForm = document.querySelector(addPopupSelector).querySelector(formParameters.formSelector);
const addFormValidator = new FormValidator(formParameters, addPopupForm);
addFormValidator.enableValidation();