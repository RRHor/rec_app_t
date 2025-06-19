// Importiere die benötigten Funktionen
import { fetchRecipes, addRecipe } from './api/recipes.js';
import { renderRecipes } from './ui/render.js';

let allRecipes = [];

/**
 * Lädt alle Rezepte vom Backend und zeigt sie an.
 */
async function loadAndRenderRecipes() {
  allRecipes = await fetchRecipes();
  renderRecipes(allRecipes);
}

/**
 * Initialisiert die Suchfunktion.
 * Filtert Rezepte nach Titel, Tags, Zutaten oder Sammlungen,
 * sobald der Nutzer im Suchfeld tippt.
 */
function setupSearch() {
  const searchInput = document.getElementById('search');
  if (!searchInput) return;

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    // Filtert Rezepte, wenn der Suchbegriff in einem der Felder vorkommt
    const filtered = allRecipes.filter(recipe =>
      recipe.title.toLowerCase().includes(query) ||
      (recipe.tags && recipe.tags.some(tag => tag.toLowerCase().includes(query))) ||
      (recipe.ingredients && recipe.ingredients.some(ingr => ingr.toLowerCase().includes(query))) ||
      (recipe.collections && recipe.collections.some(coll => coll.toLowerCase().includes(query)))
    );
    renderRecipes(filtered);
  });
}

/**
 * Initialisiert das Formular zum Hinzufügen eines neuen Rezepts.
 * Liest alle Felder aus, wandelt Komma-getrennte Eingaben in Arrays um
 * und sendet das neue Rezept an das Backend.
 */
function setupRecipeForm() {
  const form = document.getElementById('recipe-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Eingabefelder aus dem Formular holen
    const titleInput = document.getElementById('title');
    const descInput = document.getElementById('description');
    const ingredientsInput = document.getElementById('ingredients');
    const tagsInput = document.getElementById('tags');
    const ratingInput = document.getElementById('rating');
    const commentInput = document.getElementById('comment');
    const collectionsInput = document.getElementById('collections');

    // Neues Rezept-Objekt erstellen
    const newRecipe = {
      title: titleInput.value.trim(),
      description: descInput.value.trim(),
      ingredients: ingredientsInput.value.split(',').map(i => i.trim()).filter(Boolean),
      tags: tagsInput.value.split(',').map(t => t.trim()).filter(Boolean),
      rating: Number(ratingInput.value),
      comment: commentInput.value.trim(),
      collections: collectionsInput.value.split(',').map(c => c.trim()).filter(Boolean)
    };

    // Rezept an das Backend senden und Liste neu laden
    await addRecipe(newRecipe);
    await loadAndRenderRecipes();
    form.reset(); // Formular zurücksetzen
  });
}

/**
 * Initialisiert die Anwendung:
 * - Lädt und zeigt alle Rezepte
 * - Aktiviert die Suchfunktion
 * - Aktiviert das Rezept-Formular
 */
document.addEventListener('DOMContentLoaded', () => {
  loadAndRenderRecipes();
  setupSearch();
  setupRecipeForm();
});