// Импортируем базовые элементы view
import { elements } from './base';

// Получаем значение из инпута поиска
export const getSearchInputValue = () => elements.searchInput.value;
// Очистить форму поиска
export const clearSearchForm = () => elements.searchForm.reset();
// Очистить список с результатами поиска и контейнер с кнопками пагинации
export const clearSearchResults = () => {
   elements.searchResList.innerHTML = '';
   elements.searchResPagination.innerHTML = '';
}

// Подсветка выбраного рецепта
export const highLightSelected = id => {
   const resArr = document.querySelectorAll('.results__link');
   resArr.forEach(el => el.classList.remove('results__link--active'));
   document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
}

// Создаем разметку одного рецепта
const renderRecipe = recipe => {
   const markup = `
      <li>
         <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
               <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
               <h4 class="results__name">${recipe.title}</h4>
               <p class="results__author">${recipe.publisher}</p>
            </div>
         </a>
      </li>
   `;

   // Выводим разметку одного рецепта в верстку
   elements.searchResList.insertAdjacentHTML('beforeend', markup);
}

// Создаем разметку кнопки для пагинации
const createButton = (page, type) => {
   // На какую страницу будет вести кнопка
   const goto = type === 'prev' ? page - 1 : page + 1;
   return `
      <button class="btn-inline results__btn--${type}" data-goto="${goto}">
         <span>Page ${goto}</span>
         <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
         </svg>
      </button>
   `;
}

// Выводим пагинацию страниц в верстку
const renderButtons = (page, numResult, resPerPage) => {
   // Получаем количество страниц - делим общее количество объектов с рецептами на количество рецептов на одной странице и округляем к большему числу
   const pages = Math.ceil(numResult / resPerPage);
   // Переменная для кнопки
   let button;

   // Если текущая страница 1 и общее колчество страниц больше 1 - то выводим кнопку Вперед
   if (page === 1 && pages > 1) {
      button = createButton(page, 'next');
   } else if (page < pages) { // Если текущая страница не первая и не последняя то выводим обе кнопки - Вперед и Назад
      button = `
         ${createButton(page, 'prev')}
         ${createButton(page, 'next')}
      `;
   } else if (page === pages) { // Если текущая страница последняя то выводим только кнопку Назад
      button = createButton(page, 'prev');
   }

   elements.searchResPagination.insertAdjacentHTML('afterbegin', button);
}

// Выводим рецепы в верстку
export const renderResult = (recipes, page = 1, resPerPage = 10) => {
   // Логика разбиения на страницы
   // 1 page
   // 1 - 1 * 10 = 0
   // 1 * 10 =  10

   // 2 page
   // 2 - 1 * 10 = 10
   // 2 * 10 =  20
   const start = (page - 1) * resPerPage;
   const end = page * resPerPage;

   // Разбиваем общее количество рецептов на страницы с помощью slice
   recipes.slice(start, end).forEach(renderRecipe);

   // Выводим пагинацию
   renderButtons(page, recipes.length, resPerPage);
}