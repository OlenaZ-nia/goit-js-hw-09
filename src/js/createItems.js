// 1. Создание и рендер разметки по массиву данных galleryItems из app.js 
//и предоставленному шаблону.
import markupTpl from '../tamplates/markup.hbs'
export default function createItems(array) {
  return markupTpl(array);
}
// export default function createItems(array) {
//   return array
//     .map(elem => markupTpl(elem))
//     .join('');
// }

// export default function createItems(array) {
//   return array
//     .map((elem) => {
//       const { preview, original, description } = elem
//         return `
//       <li class="gallery__item">
//   <a
//     class="gallery__link"
//     href="${original}"
//   >
//     <img
//       class="gallery__image"
//       src="${preview}"
//       data-source="${original}"
//       alt="${description}"
//     />
//   </a>
// </li>`
//     })
//     .join('')
// }

