export default class Favorites {
   constructor() {
      this.items = [];
   }

   getFavs() {
      const store = localStorage.getItem('recipes');
      if (store) this.items = JSON.parse(store);
   }

   toggleFav(recipe) {
      // Если рецепта нет в фаворитах то добавляем его, если есть то удаляем
      if (!this.items.filter(item => item.id === recipe.id).length) {
         this.items.unshift({
            id: recipe.id,
            image_url: recipe.result.image_url,
            title: recipe.result.title,
            publisher: recipe.result.publisher
         });
   
         localStorage.setItem('recipes', JSON.stringify(this.items));
         alert('This recipe was added to favorites!');
      } else {
         this.deleteFav(recipe.id);
         alert('This recipe deleted from favorites!');
      }
   }

   deleteFav(id) {
      this.items = this.items.filter(item => item.id !== id);
      localStorage.setItem('recipes', JSON.stringify(this.items));
   }
}