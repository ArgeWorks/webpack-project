import { proxy, api, apiKey } from '../config'

export default class Recipe {
   constructor(id) {
      // Записываем id рецепта
      this.id = id;
      this.result = {};
   }

   async getRecipe() {
      try {
         // Получаем рецепт по id
         const res = await fetch(`${proxy}${api}/get?key=${apiKey}&rId=${this.id}`);
         const data = await res.json();
         this.result = data.recipe;
      } catch (error) {
         console.log(error);
      }
   }
}