class Validation {
  constructor(errors) {
    this.errors = errors;
  }

  // функция включения и выключения кнопок при валидации
 
  changeButtonState = (state) => {
    const submitButton = event.target.parentElement.querySelector('.button');
    if (state === true) {
      submitButton.removeAttribute('disabled');
      submitButton.classList.remove('button_no-active');
    } else {
      submitButton.setAttribute('disabled', true);
      submitButton.classList.add('button_no-active');
    }
  }

  // Проверка валидации
  
  isValid = (element) => {
    const errorElement = element.nextElementSibling;
    if (!element.validity.valid) {
      if (element.validity.typeMismatch) { 
        errorElement.textContent = this.errors.URL;
      }
      if (element.value.length < +element.getAttribute('minlength')) {
        if (element.validity.valueMissing) { 
          errorElement.textContent = this.errors.value;
        }
          else { 
            errorElement.textContent = this.errors.length;
          } 
      }
      return false   
    } else {
        errorElement.textContent = ''; 
        return true
    }
  }

  checkValidity = (form) => {
    const input = form.querySelectorAll('.popup__input');
    const array = Array.from(input);
    if ( array.every( item => this.isValid(item) ) ) this.changeButtonState(true)
        else this.changeButtonState(false); 
  }

}