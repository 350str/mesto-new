class Api {
    constructor(options){
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }

    // *** Общая функция обработки запроса ***
    checkPromise(res) {
      if (res.ok) return res.json()
                  return Promise.reject(`Ошибка: ${res.status}`);
    }

    // *** Загрузка информации с сервера при загрузке сайта ***
    getAuthorData() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers
        })
          .then(res => this.checkPromise(res))
            .catch(err => console.log(err));    
    }

    // *** Загрузка массива карточек с сервера  ***
    getCardArray() {
        return fetch(`${this.baseUrl}/cards`, {
          headers: this.headers
        })
        .then(res => this.checkPromise(res))
          .catch(err => console.log(err))
    }

    // *** Редактирование профиля через сервер ***
    patchAuthorData(nameInfo, aboutInfo) {
      return fetch(`${this.baseUrl}/users/me`, {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify({
          name: nameInfo,
          about: aboutInfo
      })
    })
        .then(res => this.checkPromise(res))
          .catch(err => console.log(err))
    }

    postCard(cardName, cardLink) {
      return fetch(`${this.baseUrl}/cards`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          name: cardName,
          link: cardLink
        })
      })
      .then(res => this.checkPromise(res))
        .catch(err => console.log(err));
    }
   
    deleteCard(id) {
      fetch(`${this.baseUrl}/cards/${id}`, {
        method: "DELETE",
        headers: this.headers
      })
        .then(res => this.checkPromise(res))
          .catch(err => console.log(err));
    }

    patchProfilePic(link) {
      return fetch(`${this.baseUrl}/users/me/avatar`,{
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify({
          avatar: link
        })
      })
      .then(res => this.checkPromise(res))
        .catch(err => console.log(err));
    }

    addLike(id) {
      fetch(`${this.baseUrl}/cards/like/${id}`, {
        method: "PUT",
        headers: this.headers
      })
      .then(res => this.checkPromise(res))
        .catch(err => console.log(err))
    }

    removeLike(id) {
      fetch(`${this.baseUrl}/cards/like/${id}`, {
        method: "DELETE",
        headers: this.headers
      })
      .then(res => this.checkPromise(res))
        .catch(err => console.log(err))
    }

    // "Загрузка ..." при прогрузке данных профиля
    loading(state, form) {
      const button = form.querySelector('.popup__button');
      button.setAttribute('style', 'font-size: 18px');
      if (state) {
        button.textContent = 'Загрузка...'
      } else {
        button.textContent = 'Сохранить';
      }
  }
}