// 1. Создание и рендер разметки по массиву данных galleryItems из app.js 
//и предоставленному шаблону.

import galleryItems from './data/app'

const list = document.querySelector('.js-gallery');

function createItems(array) {
  return array
    .map((elem) => {
      const { preview, original, description } = elem
        return `
      <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
    })
    .join('')
}

const markup = createItems(galleryItems)
list.insertAdjacentHTML('afterbegin', markup)

// 2.Реализация делегирования на галерее ul.js-gallery 
//и получение url большого изображения.

const options = {
    // root: list,
    rootMargin: '0px',
    threshold: 0.5,
};

const observer = new IntersectionObserver(callback, options);
function callback(entries) {
  entries.forEach(entry => {
    entry.isIntersecting
      ? entry.target.classList.add('observe')
      : entry.target.classList.remove('observe')
  })
}
const items = [...list.children]
items.forEach((item) => observer.observe(item))

//3. Открытие модального окна по клику на элементе галереи.
//4. Подмена значения атрибута src элемента img.lightbox__image.

const modal = document.querySelector('.js-lightbox');
const modalImage = document.querySelector('.lightbox__image');

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
const closeBtn = document.querySelector('[data-action="close-lightbox"]');

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', scrolIng);
  modal.classList.remove('is-open');
  modalImage.removeAttribute('src');
  modalImage.removeAttribute('alt');
}

closeBtn.addEventListener('click', onCloseModal);

//Закрытие модального окна по клику на div.lightbox__overlay.

const backdrop = document.querySelector('.lightbox__overlay');
backdrop.addEventListener('click', onCloseModal);

//Закрытие модального окна по нажатию клавиши ESC.

function onEscKeyPress(e) {
  const isEscKey = e.code === 'Escape';

  if (isEscKey) {
    onCloseModal();
  }
}

//Пролистывание изображений галереи в открытом модальном окне 
//клавишами "влево" и "вправо".

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


  


