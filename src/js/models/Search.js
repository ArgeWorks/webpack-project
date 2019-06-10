import { proxy, api, apiKey } from '../config'

export default class Search {
   constructor(query) {
      // Поисковый запрос
      this.query = query;
      // Результат поиска
      this.result = {};
   }

   async getResult() {
      try {
         // Получаем список рецептов по ключевому слову
         const res = await fetch(`${proxy}${api}/search?key=${apiKey}&q=${this.query}`);
         const data = await res.json();

         // Записываем результат поиска в this.result и возвращаем его
         this.result = data.recipes;
      } catch (error) {
         console.log(error);
      }
   }
}