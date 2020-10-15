export default class Api {
    constructor(config) {
        this._url = config.baseUrl;
        this._headers = config.headers;
    }

    _handleResponse(res) {
        if(res.ok) {
            return res.json();
        } else return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._handleResponse);
    }

    addCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(this._handleResponse);
    }

    deleteCard(data) {
        return fetch(`${this._url}/cards/${data._id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._handleResponse);
    }

    changeAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(this._handleResponse);
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._handleResponse);
    }

    editUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(this._handleResponse);
    }

    likeCard(data) {
        return fetch(`${this._url}/cards/likes/${data._id}`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(this._handleResponse);
    }
    
    unLikeCard(data) {
        return fetch(`${this._url}/cards/likes/${data._id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._handleResponse);
    }
}