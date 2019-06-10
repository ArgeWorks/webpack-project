import uniqid from 'uniqid';

export default class List {
   constructor() {
      // Массив с инредиентами
      this.items = [];
   }

   // Добавление ингредиента в массив
   addItem(ingredient) {
      const newItem = {
         'id': uniqid(),
         ingredient
      }

      this.items.push(newItem);
   }

   // Удаление ингредиента из массива
   deleteItem(id) {
      this.items = this.items.filter(item => item.id != id);
   }
}