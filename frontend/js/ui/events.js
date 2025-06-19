// Importiere die API- und UI-Funktionen
import { fetchRecipes, addRecipe, deleteRecipe } from '../api/recipes.js';
import { renderRecipes } from './render.js';

// Funktion: Event-Listener einrichten
export function setupEventListeners() {
  // Event-Listener für das Formular zum Hinzufügen eines Rezepts
  document.getElementById('recipe-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Verhindert das Standardverhalten des Formulars (Seiten-Neuladen)

    // Hole die Werte aus den Eingabefeldern
    const recipe = {
      title: document.getElementById('title').value,
      ingredients: document.getElementById('ingredients').value.split(','),
      description: document.getElementById('description').value,
      comment: document.getElementById('comment').value,
      rating: parseInt(document.getElementById('rating').value, 10),
    };

    try {
      await addRecipe(recipe); // Sende das neue Rezept an das Backend
      const recipes = await fetchRecipes(); // Lade die aktualisierte Liste der Rezepte
      renderRecipes(recipes); // Zeige die Rezepte im DOM an
    } catch (error) {
      console.error('Fehler beim Hinzufügen des Rezepts:', error.message); // Logge den Fehler
    }
  });
}