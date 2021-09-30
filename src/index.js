// import './js/task'
import './css/styles.css'
import galleryItems from './js/data/app';

import refs from './js/refs';
const { list, modal, modalImage, closeBtn, backdrop } = refs;

// // 1. Создание и рендер разметки по массиву данных galleryItems из app.js 
// //и предоставленному шаблону.
import createItems from './js/createItems';
const markup = createItems(galleryItems);
list.insertAdjacentHTML('afterbegin', markup);

// // 2.Observer.
import './js/observer'

// // 2.Реализация делегирования на галерее ul.js-gallery 
// //и получение url большого изображения.
// //3. Открытие модального окна по клику на элементе галереи.
// //4. Подмена значения атрибута src элемента img.lightbox__image.

function onOpenModal() {
  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', scrolIng);
  modal.classList.add('is-open');
}
list.addEventListener('click', (e) => {
  e.preventDefault()
  
  if (e.target.nodeName === 'IMG') {
    onOpenModal();
    modalImage.setAttribute('src', e.target.dataset.source);
    modalImage.setAttribute('alt', e.target.alt);
  }
})

//5. Закрытие модального окна по клику на кнопку 
//button[data - action= "close-lightbox"].
//6. Очистка значения атрибута src элемента img.lightbox__image.
function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', scrolIng);
  modal.classList.remove('is-open');
  modalImage.removeAttribute('src');
  modalImage.removeAttribute('alt');
}
closeBtn.addEventListener('click', onCloseModal);

//Закрытие модального окна по клику на div.lightbox__overlay.
backdrop.addEventListener('click', onCloseModal);

//Закрытие модального окна по нажатию клавиши ESC.
function onEscKeyPress(e) {
  const isEscKey = e.code === 'Escape';

  if (isEscKey) {
    onCloseModal();
  }
}

// //Пролистывание изображений галереи в открытом модальном окне 
// //клавишами "влево" и "вправо".
function scrolIng(e) {
  let count = 0;
  let currentEl = galleryItems.findIndex(i => i.original === modalImage.src);
  if (e.code === 'ArrowLeft') {
    count = currentEl - 1;
    if (count<0) {
      count = galleryItems.length-1;
    };
  }
  if (e.code === 'ArrowRight') {
    count = currentEl + 1;
    if (count > galleryItems.length-1) {
      count = 0;
    };
  }
  modalImage.src = galleryItems[count].original;
  modalImage.alt = galleryItems[count].description;
}


