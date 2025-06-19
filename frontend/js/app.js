// Importiere die benötigten Funktionen
import { fetchRecipes, addRecipe } from './api/recipes.js';
import { renderRecipes } from './ui/render.js';
import { setupEventListeners } from './ui/events.js';

// Initialisiere die Anwendung, wenn die Seite geladen wird
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const recipes = await fetchRecipes(); // Lade die Rezepte vom Backend
    renderRecipes(recipes); // Zeige die Rezepte im DOM an
    setupEventListeners(); // Richte die Event-Listener ein
  } catch (error) {
    console.error('Fehler beim Laden der Rezepte:', error.message); // Logge den Fehler
  }
});

// Funktion zum Hinzufügen eines neuen Rezepts
async function handleAddRecipe() {
  const tagsInput = document.getElementById("tags").value;
  const tags = tagsInput.split(",").map(tag => tag.trim()); // In Array umwandeln

  const newRecipe = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    ingredients: document.getElementById("ingredients").value.split(","),
    rating: parseInt(document.getElementById("rating").value, 10),
    tags: tags, // Tags hinzufügen
  };

  try {
    await addRecipe(newRecipe); // Rezept speichern

    // Felder nach dem Speichern leeren
    document.getElementById("title").value = '';
    document.getElementById("description").value = '';
    document.getElementById("ingredients").value = '';
    document.getElementById("rating").value = '';
    document.getElementById("tags").value = '';

    alert('Rezept erfolgreich gespeichert!'); // Erfolgsmeldung
  } catch (error) {
    console.error('Fehler beim Speichern des Rezepts:', error);
    alert('Fehler beim Speichern des Rezepts.'); // Fehlermeldung
  }
}

// Filterfunktion um nach bestimmten Tags zu filtern
const filterByTag = async (tag) => {
  const response = await fetch(`${API_BASE_URL}/recipes/tags/${tag}`);
  const recipes = await response.json();
  renderRecipes(recipes);
};

document.getElementById('recipe-form').addEventListener('submit', async (event) => {
  event.preventDefault(); // Verhindert das automatische Neuladen der Seite
  await handleAddRecipe(); // Führt die Funktion aus
});