// Импортируем базовые элементы view
import { elements } from './base';

export const clearFavsContainer = () => elements.favoritesList.innerHTML = '';

const renderFav = (item) => {
   const markup = `
      <li>
         <a class="likes__link" href="#${item.id}">
            <figure class="likes__fig">
               <img src="${item.image_url}" alt="${item.title}">
            </figure>
            <div class="likes__data">
               <h4 class="likes__name">${item.title}</h4>
               <p class="likes__author">${item.publisher}</p>
            </div>
         </a>
      </li>
   `;

   elements.favoritesList.insertAdjacentHTML('beforeend', markup);
}

export const renderFavs = resipies => resipies.forEach(renderFav);
