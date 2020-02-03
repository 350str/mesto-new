import Api from './Api';

export default class Card {
  
  constructor(api) {
    this.api = api;
  }

  // ставим лайк на карточку 
  like = () => {
    const button = event.target;
    const likeCounter = event.target.nextElementSibling;
    const api = new Api(this.api);
    
    if (button.classList.contains('place-card__like-icon')) {
      if (button.classList.contains('place-card__like-icon_liked')) {
        button.classList.remove('place-card__like-icon_liked');
        likeCounter.textContent = +likeCounter.textContent - 1;
        api.removeLike(event.target.parentElement.parentElement.parentElement.id);
      } else {
        button.classList.add('place-card__like-icon_liked');
        likeCounter.textContent = +likeCounter.textContent + 1;
        api.addLike(event.target.parentElement.parentElement.parentElement.id);
      }
    }

  }

  // удаляем карточку 
  remove = () => {
    if (event.target.classList.contains('place-card__delete-icon')) {
      event.target.parentElement.parentElement.remove();
      new Api(this.api).deleteCard(event.target.parentElement.parentElement.id);
    }
  }

  
  // создаем карточку (входные данные this.name и this.link из конструктора)
  create(name, link, likes = [], user_id, id) {
    const placeCard = document.createElement("div");
    placeCard.classList.add("place-card");
    placeCard.insertAdjacentHTML('beforeEnd', `   
    <div class="place-card__image">
        <button class="place-card__delete-icon"></button>
    </div>
    <div class="place-card__description">
        <h3 class="place-card__name"></h3>
        <div class="place-card__like-container">
          <button class="place-card__like-icon"></button>
          <p class="place-card__like-counter">0</p>
        </div>
    </div>`);

    placeCard.querySelector(".place-card__name").textContent = name;
    placeCard.querySelector(".place-card__image").style.backgroundImage = `url(${ link })`;
    placeCard.querySelector(".place-card__like-counter").textContent = likes.length;
    
    new Api(this.api).getAuthorData().then(json => {
      if (likes.some(item => item._id === json._id)) {
        placeCard.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked');
      }
      if (user_id === json._id) {
        placeCard.querySelector('.place-card__delete-icon').style.display = "block";
      } 
    });

    placeCard.setAttribute('id', id);
    
    return placeCard;
  }
}