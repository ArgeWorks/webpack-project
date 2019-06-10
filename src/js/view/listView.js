// Импортируем базовые элементы view
import { elements } from './base';

// Создание и вывод одного элемента
const createShoppingListItem = item => {
   const markup = `
      <li class="shopping__item" data-id="${item.id}">
         <p class="shopping__description">${item.ingredient}</p>
         <button class="shopping__delete btn-tiny">
            <svg>
               <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
         </button>
      </li>
   `;

   elements.shoppingList.insertAdjacentHTML('beforeend', markup);
}

// Вывод всех элементов в верстку
export const renderShoppingList = ingredients => {
   ingredients.forEach(createShoppingListItem);
}

// Удаление элемента из списка в верстке
export const removeShoppingListItem = item => item.remove();