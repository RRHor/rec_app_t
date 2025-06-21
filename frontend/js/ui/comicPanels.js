import { recipeCardTemplate } from './template.js';
import { openEditFormInCard } from './editForm.js';
import { handleCommentsToggle, handleDelete, handleRating, handleTags } from './eventHandler.js';
import { fetchRecipes, deleteRecipe, updateRecipe } from "../api/recipes.js";
import { showToast } from './toast.js';

/**
 * Rendert die Rezepte als Comic-Panels in das Grid.
 * @param {Array} recipes - Array mit Rezept-Objekten
 */
export function renderComicPanels(recipes) {
  const panelsContainer = document.getElementById('comic-panels');
  if (!panelsContainer) return;
  panelsContainer.innerHTML = '';

  recipes.forEach((recipe) => {
    // Dynamische Größenlogik: Passe die Bedingungen nach Wunsch an!
    let sizeClass = 'small';
    const textLength = (recipe.description?.length || 0) + (recipe.ingredients?.join(',').length || 0);

    if (textLength > 400 || (recipe.ingredients && recipe.ingredients.length > 10)) {
      sizeClass = 'large';
    } else if (textLength > 200 || (recipe.ingredients && recipe.ingredients.length > 5)) {
      sizeClass = 'medium';
    }

    const recipeElement = document.createElement('div');
    recipeElement.className = `comic-panel ${sizeClass}`;
    recipeElement.innerHTML = recipeCardTemplate(recipe);

    panelsContainer.appendChild(recipeElement);

    // Kommentarbereich und Umschalt-Button finden und Event-Handler setzen
    const toggleCommentsButton = recipeElement.querySelector('.toggle-comments');
    const commentsDiv = recipeElement.querySelector('.comments');
    handleCommentsToggle(commentsDiv, toggleCommentsButton);

    // Löschen-Button finden und Event-Handler setzen
    const deleteButton = recipeElement.querySelector('.delete-button');
    handleDelete(deleteButton, recipe._id, fetchRecipes, renderComicPanels);

    // Bewertungssterne finden und Event-Handler setzen
    const stars = recipeElement.querySelectorAll('.star');
    handleRating(stars, recipe._id, fetchRecipes, renderComicPanels);

    // Tag-Hinzufügen-Button und Tag-Input finden und Event-Handler setzen
    const addTagButton = recipeElement.querySelector('.add-tag-button');
    const tagInput = recipeElement.querySelector('.tag-input');
    handleTags(addTagButton, tagInput, { ...recipe, tags: recipe.tags || [] }, recipe._id, fetchRecipes, renderComicPanels);

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