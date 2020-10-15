export default class UserInfo {
    constructor({ userNameSelector, userInfoSelector, userAvatarSelector }) {        
        this._userNameElement = document.querySelector(userNameSelector);
        this._userInfoElement = document.querySelector(userInfoSelector);
        this._userAvatarElement = document.querySelector(userAvatarSelector);
    }

    getUserInfo() {
        const userData = {};

        userData.name = this._userNameElement.textContent;
        userData.description = this._userInfoElement.textContent;

        /* объект с данными пользователя со страницы */
        return userData;
    }

    setAvatar(data) {
        this._userAvatarElement.style.backgroundImage = `url(${data.avatar})`;
    }

    /* добавление с сервера данных пользователя на страницу */
    setUserInfo(data) {
        this._userNameElement.textContent = data.name;
        this._userInfoElement.textContent = data.about;
        // this._userAvatarElement.style.backgroundImage = `url(${data.avatar})`;
    }
}