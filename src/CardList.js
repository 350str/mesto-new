import Api from './Api';
import Card from './Card';

export default class CardList {
  
  constructor(container, api) {
    this.container = container;
    this.api = api;
  }

  // добавление карточки
  addCard = () => {
    const popupCard = document.querySelector('.popup_add');
    const popupCardForm = document.forms.add;
    const cardName = popupCardForm.elements.name.value;
    const cardLink = popupCardForm.elements.link.value;
  
    event.preventDefault();

    const api = new Api(this.api);
    
    this.container.append( new Card(this.api).create(cardName, cardLink) );

    api.loading(true, popupCard);
    api.postCard(cardName, cardLink)         
      .finally( () => {
        api.loading(false, popupCard);
        popupCard.classList.remove('popup_is-opened')
      });   
    popupCardForm.reset();
  }

  // рендер массива с карточками через метод create класса Card
  render(author) {
    const loader = document.querySelector('.places-list__loader');
    new Api(this.api).getCardArray()
      .then(json => json.forEach(item => 
        this.container.append( new Card(this.api).create( 
          item.name, item.link, item.likes, item.owner._id, item._id, author 
        ))
      ))
      .finally(() => loader.classList.add('places-list__loader_disabled'));
  }
}