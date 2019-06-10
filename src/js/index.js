// Global app controller
import Search from './models/Search';
import * as searchView from './view/searchView';
import Recipe from './models/Recipe';
import * as recipeView from './view/recipeView';
import List from './models/List';
import * as listView from './view/listView';
import Favorites from './models/Favorites';
import * as favoritesView from './view/favoritesView';

import { elements, renderLoader, clearLoader } from './view/base';

/** Gobal state of the app
 * - search - Объект поиска и его результат
 * - recipe - Объект с текущим рецептом
 * - list - Объект со списком ингредиентов в корзине
 * - favorites - Объект с любимыми рецептами
 *  */
const state = {};

// === Контроллер поиска === //
const controlSearch = async () => {
   // Получаем ключевое слово для поиска
   const query = searchView.getSearchInputValue();

   // Если есть ключевое слово
   if (query) {
      // Создаем новый класс поиска с ключевой фразой
      state.search = new Search(query);

      // Очищаем форму поиска и контейнер с результатами поиска
      searchView.clearSearchForm();
      searchView.clearSearchResults();

      // Выводим лоадер
      renderLoader(elements.searchRes);

      // Запускаем поиск по ключевому слову и ждем окончания
      await state.search.getResult();

      // Удаляем лоадер
      clearLoader();

      // Выводим результат поиска в верстку
      if (state.search.result) searchView.renderResult(state.search.result);
   }
}

// Устанавливаем событие на отправку формы поиска
elements.searchForm.addEventListener('submit', e => {
   e.preventDefault();
   controlSearch();
});

// Устанавливаем событие на переключение стрниц
elements.searchResPagination.addEventListener('click', e => {
   const btn = e.target.closest('.btn-inline');
   
   if (btn) {
      // Получаем номер страницы на которую нужно перейти
      const goto = parseInt(btn.dataset.goto);
      // Очищаем контейнер с результатами поиска и контейнер с кнопками пагинации
      searchView.clearSearchResults();
      // Выводим результат поиска в верстку
      searchView.renderResult(state.search.result, goto);
   }
});

// === Контрллеры списка ингредиентов и фаворитов === //
// Удаление ингредиента
const removeShoppingItem = e => {
   // Получаем кнопку delete если клик был по ней
   const btn = e.target.closest('.shopping__delete');

   if (btn) {
      // Получаем текущий элемент списка
      const item = e.target.closest('.shopping__item');
      // Получаем айди ингредиента
      const id = item.dataset.id;

      // Отключаем событие
      item.removeEventListener('click', removeShoppingItem);
      // Удаляем ингредиент из верстки
      listView.removeShoppingListItem(item);
      // Удаляем ингредиент из массива
      state.list.deleteItem(id);
   }
}

// Контроллер списка
const controlList = () => {
   // Если список еще не был создан - создаем его
   if (!state.list) state.list = new List();

   // Сохраняем массив с ингредиентами и проставляем им уникальные id
   state.recipe.result.ingredients.forEach(ingredient => state.list.addItem(ingredient));

   // Выводим список ингредиентов в верстку
   listView.renderShoppingList(state.list.items);

   // Вешаем событие на все кнопки удаления ингредиента
   elements.shoppingList.addEventListener('click', removeShoppingItem);
}

// Контроллер фаворитов
const controlFavorites = firstRun => {
   // Инитим класс фаворитов если он еще не заиничен
   if (!state.favorites) state.favorites = new Favorites();

   // state.favorites.clearFavs();

   // Если первый запуск подгружаем фавориты с локал стореджа
   if (firstRun) {
      state.favorites.getFavs();
   } else { // Иначе добавляем или удаляем рецепт из фаворитов
      state.favorites.toggleFav(state.recipe);
   }

   // Очищаем контейнер с фаворитами
   favoritesView.clearFavsContainer();

   // Выводим фавориты в верстку
   if (state.favorites.items.length) favoritesView.renderFavs(state.favorites.items);
}

const recipeHandler = e => {
   // Если была нажата кнопка шопинг листа
   if (e.target.closest('.recipe__btn')) controlList();
   // Если была нажата кнопка добавить в фавориты
   if (e.target.closest('.recipe__love')) controlFavorites(false);
}

// Вешаем слушатель на контернер с рецептом для отслеживания кликов по кнопкам шаппинг листа и добавления в фавориты
elements.recipe.addEventListener('click', recipeHandler);
// При загрузке страницы подгружаем список фаворитов
window.addEventListener('load', controlFavorites(true));


// === Контрллер рецептов === //
const controlRecipe = async () => {
   // Получаем айдишник рецепта из url
   const id = window.location.hash.replace('#', '');

   if (id) {
      // Подсвечиваем выбранный рецепт
      if (state.search) searchView.highLightSelected(id);

      // Очищаем контейнер с рецептом
      recipeView.clearRecipe();

      // Выводим лоадер
      renderLoader(elements.recipe);

      // Создаем новый класс с рецептом
      state.recipe = new Recipe(id);

      // Получаем рецепт
      await state.recipe.getRecipe();

      // Удаляем лоадер
      clearLoader();

      // Выводим рецепт в верстку
      recipeView.renderRecipe(state.recipe.result);
   }  
}

// Отслеживаем изменения хеша в адресной строке
window.addEventListener('hashchange', controlRecipe);

// Удаляем хеш в строке адреса при загрузки страницы
window.addEventListener('load', () => {
   if (!state.search) window.location.hash = '';
});

