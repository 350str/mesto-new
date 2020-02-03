import './pages/index.css';
import apiData from './apiData';
import Card from './Card';
import CardList from './CardList';
import errors from './errors';
import Popup from './Popup';
import Validation from './Validation';

(function () {

  const rootDirection = document.querySelector('.root');
  const cardContainer = document.querySelector('.places-list');
  const popupCard = document.forms.add;
  const popupProfile = document.forms.edit;
  const popupPic = document.forms.pic;
  const popupCardButton = document.querySelector('.user-info__button_add');
  const popupProfileButton = document.querySelector('.user-info__button_edit');
  const popupProfilePic = document.querySelector('.user-info__photo');
  

  // создаем копии объектов из классов
  const card = new Card(apiData);
  const cardList = new CardList(cardContainer, apiData);
  const popup = new Popup(apiData);
  const valid = new Validation(errors);

  popup.loadProfileData();
  cardList.render(apiData);
  
  rootDirection.addEventListener('click', card.like);
  rootDirection.addEventListener('click', card.remove);
  rootDirection.addEventListener('click', popup.close);
  rootDirection.addEventListener('click', popup.showPopupImage);

  popupCard.addEventListener('submit', cardList.addCard);
  popupCard.addEventListener('input', valid.checkValidity.bind(this, popupCard));
  popupCardButton.addEventListener('click', popup.showPopupCard);

  popupProfile.addEventListener('submit', popup.editPopupProfile);
  popupProfile.addEventListener('input', valid.checkValidity.bind(this, popupProfile));
  popupProfileButton.addEventListener('click', popup.showPopupProfile);

  popupProfilePic.addEventListener('click', popup.showPopupPic);
  popupPic.addEventListener('submit', popup.editPopupPic);
  popupPic.addEventListener('input', valid.checkValidity.bind(this, popupPic));
})();