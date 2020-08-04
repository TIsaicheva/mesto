
let usePprofile = document.querySelector('.profile');
let edditButton = usePprofile.querySelector('.profile__info-edit-button');
let userTitle = usePprofile.querySelector('.profile__info-title');
let userSubtitle = usePprofile.querySelector('.profile__info-subtitle');
let popup = document.querySelector('.popup');
let popupCloseBtn = popup.querySelector('.popup__close');
let formElement = popup.querySelector('.popup__form');
let nameInput = popup.querySelector('#userName');
let descriptInput = popup.querySelector('#userDescription');

function popupToggle() {
    if(!popup.classList.contains('.popup_opened')) {
        popup.classList.toggle('popup_opened');
        nameInput.value = userTitle.textContent;
        descriptInput.value = userSubtitle.textContent;
    } else {
        popup.classList.toggle('popup_opened');
    } 
}

function formSubmitHandler(evt) {
    evt.preventDefault();    
    
    userTitle.textContent = nameInput.value;
    userSubtitle.textContent = descriptInput.value;

    popupToggle();
}

edditButton.addEventListener('click', popupToggle);
popupCloseBtn.addEventListener('click', popupToggle);
formElement.addEventListener('submit', formSubmitHandler);
