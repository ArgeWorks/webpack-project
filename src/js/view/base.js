// Базовые элементы view
export const elements = {
   // Форма поиска
   searchForm: document.querySelector('.search'),
   // Инпут формы поиска
   searchInput: document.querySelector('.search__field'),
   // Контейнер со списком рецептов из поиска
   searchRes: document.querySelector('.results'),
   // Список рецептов из поиска
   searchResList: document.querySelector('.results__list'),
   // Контейнер с кнопками пагинации
   searchResPagination: document.querySelector('.results__pages'),
   // Контейнер рецепта
   recipe: document.querySelector('.recipe'),
   // Контейнер шопинг листа
   shoppingList: document.querySelector('.shopping__list'),
   // Контейнер фаворитов
   favoritesList: document.querySelector('.likes__list')
}

// Выводим лоадер в разметку
export const renderLoader = parent => {
   const markup = `
      <div class="loader">
         <svg><use href="img/icons.svg#icon-cw"></use></svg>
      </div>
   `;

   parent.insertAdjacentHTML('afterbegin', markup);
}

// Удаляем лоадер с разметки
export const clearLoader = () => {
   const loader = document.querySelector('.loader');
   if (loader) loader.parentElement.removeChild(loader);
}