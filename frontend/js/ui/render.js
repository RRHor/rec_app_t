import { deleteRecipe, fetchRecipes, updateRecipe } from "../api/recipes.js";
import { openEditFormInCard } from './editForm.js';
import { recipeCardTemplate } from './template.js';
import { handleCommentsToggle, handleDelete, handleRating, handleTags } from './eventHandler.js';
import { showToast } from './toast.js'; // Importiere die Toast-Funktion

// Funktion: Zeigt alle Rezepte im DOM an
export function renderRecipes(recipes) {
  const recipesContainer = document.getElementById('recipes');
  recipesContainer.innerHTML = ''; // Vorherige Rezepte entfernen

  recipes.forEach((recipe) => {
    // Zutatenliste als HTML-Liste erzeugen
    const ingredientsHTML = recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('');
    // Tags als HTML (wird aktuell nicht mehr für die Anzeige genutzt, da Chips oben angezeigt werden)
    const tagsHTML = recipe.tags.map(tag => `<span class="tag bg-yellow-300 px-2 py-1 rounded-md">${tag}</span>`).join(' ');

    // Rezeptkarten-Element erzeugen
    const recipeElement = document.createElement('div');
    recipeElement.className = 'recipe-card bg-white p-4 rounded-md shadow-md border-4 border-black mb-4 relative';
    recipeElement.innerHTML = recipeCardTemplate(recipe, tagsHTML, ingredientsHTML);

    // Rezeptkarte zum Container hinzufügen
    recipesContainer.appendChild(recipeElement);

    // Kommentarbereich und Umschalt-Button finden und Event-Handler setzen
    const toggleCommentsButton = recipeElement.querySelector('.toggle-comments');
    const commentsDiv = recipeElement.querySelector('.comments');
    handleCommentsToggle(commentsDiv, toggleCommentsButton);

    // Löschen-Button finden und Event-Handler setzen
    const deleteButton = recipeElement.querySelector('.delete-button');
    handleDelete(deleteButton, recipe._id, fetchRecipes, renderRecipes);

    // Bewertungssterne finden und Event-Handler setzen
    const stars = recipeElement.querySelectorAll('.star');
    handleRating(stars, recipe._id, fetchRecipes, renderRecipes);

    // Tag-Hinzufügen-Button und Tag-Input finden und Event-Handler setzen
    const addTagButton = recipeElement.querySelector('.add-tag-button');
    const tagInput = recipeElement.querySelector('.tag-input');
    handleTags(addTagButton, tagInput, { ...recipe, tags: recipe.tags || [] }, recipe._id, fetchRecipes, renderRecipes);

    // Toast-Benachrichtigung beim Löschen anzeigen
    deleteButton.addEventListener('click', () => {
      showToast('Rezept erfolgreich gelöscht!', 'success');
    });

    // Toast-Benachrichtigung beim Hinzufügen eines Tags anzeigen
    addTagButton.addEventListener('click', () => {
      const newTag = tagInput.value.trim();
      if (newTag) {
        showToast(`Tag "${newTag}" hinzugefügt!`, 'success');
      } else {
        showToast('Tag darf nicht leer sein!', 'error');
      }
    });

    // Bearbeiten-Button finden und Event-Handler setzen
    const editButton = recipeElement.querySelector('.edit-button');
    editButton.addEventListener('click', () => {
      openEditFormInCard(recipeElement, recipe); // Öffne das Bearbeiten-Formular in der Rezeptkarte
    });
  });
}