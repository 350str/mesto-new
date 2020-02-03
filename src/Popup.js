import Api from './Api';

export default class Popup {

  constructor(api) {
    this.api = api;
  }

  loadProfileData() {
    const authorName = document.querySelector('.user-info__name');
    const authorAbout = document.querySelector('.user-info__job');
    const authorImage = document.querySelector('.user-info__photo');

    new Api(this.api).getAuthorData()
      .then((json) => {
        authorName.textContent = json.name;
        authorAbout.textContent = json.about;
        authorImage.style.backgroundImage = `url(${json.avatar})`;
      });     
  }

  // отображение формы add (добавление новой карточки)
  showPopupCard = () => {
    const popupCard = document.querySelector('.popup_add');
    const popupCardForm = document.forms.add;
    const popupCardButton = document.querySelector('.popup__button_add');
    popupCardForm.reset();

    popupCardButton.setAttribute('disabled', true);
    popupCardButton.classList.add('button_no-active');

    popupCard.classList.add('popup_is-opened');
    popupCard.querySelector('.popup__validation_card-name').textContent = '';
    popupCard.querySelector('.popup__validation_link').textContent = '';
  }

  // отображение формы edit (редактирование профиля)
  showPopupProfile = () => {
    const popupProfile = document.querySelector('.popup_edit');
    const popupProfileForm = document.forms.edit;
    const authorName = document.querySelector('.user-info__name');
    const authorJob = document.querySelector('.user-info__job');
    const popupProfileButton = popupProfile.querySelector('.button');

    popupProfileForm.author.value = authorName.textContent;
    popupProfileForm.about.value = authorJob.textContent;

    popupProfile.classList.add('popup_is-opened');
    popupProfile.querySelector('.popup__validation_author-name').textContent = '';
    popupProfile.querySelector('.popup__validation_about').textContent = '';

    popupProfileButton.removeAttribute('disabled');
    popupProfileButton.classList.remove('button_no-active');
    
  }

  showPopupPic = () => {
    const popupPic = document.querySelector('.popup__profile_pic');
    const popupPicForm = document.forms.pic;
    const popupPicButton = document.querySelector('.popup__button_pic');
    popupPicForm.reset();

    popupPicButton.setAttribute('disabled', true);
    popupPicButton.classList.add('button_no-active');

    popupPic.classList.add('popup_is-opened');
    popupPic.querySelector('.popup__validation_link').textContent = '';
  }

  // функция увеличения картинок по клику
  showPopupImage() {
    const imageContainer = document.querySelector('.popup_big-pic');
    const imageElement = document.querySelector('.popup__big-image');
    const imageURL = event.target.style.backgroundImage;

    if (event.target.classList.contains('place-card__image')) {
      imageContainer.classList.add('popup_is-opened');
      imageElement.setAttribute('src', imageURL.slice(5, imageURL.length - 2));
    }
  }

  // функция для запоминания данных, введенных в Edit
  editPopupProfile = () => {
    const popupProfile = document.querySelector('.popup_edit');
    const popupProfileForm = document.forms.edit;
    const authorName = document.querySelector('.user-info__name');
    const authorJob = document.querySelector('.user-info__job');
  
    event.preventDefault();
    authorName.textContent = popupProfileForm.author.value;
    authorJob.textContent = popupProfileForm.about.value;
    
    // вызов метода класса Api для отправки введенных данных на сервер
    const api = new Api(this.api);

    api.loading(true, popupProfile);
    api.patchAuthorData(popupProfileForm.author.value, popupProfileForm.about.value)
      .finally(() => {
        api.loading(false, popupProfile);
        popupProfile.classList.remove('popup_is-opened');
      });   
  }

  editPopupPic = () => {
    const popupPic = document.querySelector('.popup__profile_pic');
    const popupPicForm = document.forms.pic;
    const profilePhoto = document.querySelector('.user-info__photo');

    event.preventDefault();
    profilePhoto.style.backgroundImage = `url("${popupPicForm.link.value}")`; 

    const api = new Api(this.api);
    api.loading(true, popupPic);
    api.patchProfilePic(popupPicForm.link.value)
      .finally(() => {
        api.loading(false, popupPic);
        popupPic.classList.remove('popup_is-opened');            // скрываем форму после отправки
      })
  }

  // закрытие форм
  close() {
    if (event.target.classList.contains('popup__close'))
      event.target.parentElement.parentElement.classList.remove('popup_is-opened');
  }
  
}