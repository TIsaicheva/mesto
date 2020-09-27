export default class UserInfo {
    constructor({ userNameSelector, userInfoSelector }) {
        
        this._userNameElement = document.querySelector(userNameSelector);
        this._userInfoElement = document.querySelector(userInfoSelector);
    }

    getUserInfo() {
        const userData = {};

        userData.name = this._userNameElement.textContent;
        userData.description = this._userInfoElement.textContent;

        // объект с данными пользователя со страницы
        return userData;
    }

    // метод добавления на страницу данных из полей формы
    setUserInfo({userName, userDescription}) {
        this._userNameElement.textContent = userName;
        this._userInfoElement.textContent = userDescription;       
    }
}