
let usePprofile = document.querySelector('.profile');
let edditButton = usePprofile.querySelector('.profile__info-edit-button');
let userTitle = usePprofile.querySelector('.profile__info-title');
let userSubtitle = usePprofile.querySelector('.profile__info-subtitle');
let popup = document.querySelector('.popup');
let popupCloseBtn = popup.querySelector('.popup__close');
let formElement = popup.querySelector('.popup__form');
let nameInput = popup.querySelector('#userName');
let descriptInput = popup.querySelector('#userDescription');
let saveButton = formElement.querySelector('.popup__submit');  

function openPopup(evt) {
    evt.preventDefault();
    let popup = document.querySelector('.popup');
    popup.classList.toggle('popup_opened');    
}

function closePopup(evt) {
    if(evt.target !== evt.currentTarget) return; 
    openPopup(evt);
}

function popupToggle() {
    popup.classList.toggle('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();    
    
    userTitle.textContent = nameInput.value;
    userSubtitle.textContent = descriptInput.value;

    closePopup(evt);
}

nameInput.value = userTitle.textContent;
descriptInput.value = userSubtitle.textContent;
edditButton.addEventListener('click', openPopup);
popupCloseBtn.addEventListener('click', popupToggle);
popup.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
