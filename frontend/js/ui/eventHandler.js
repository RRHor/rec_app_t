import { updateRecipe, deleteRecipe, fetchRecipes } from '../api/recipes.js';
import { showToast } from './toast.js';
import { renderRecipes } from './render.js';

/**
 * Setzt einen Event-Handler für das Umschalten der Anzeige von Kommentaren.
 * Öffnet oder schließt den Kommentarbereich und passt den Button-Text an.
 */
export function handleCommentsToggle(commentsDiv, toggleCommentsButton) {
  toggleCommentsButton.addEventListener('click', () => {
    if (commentsDiv.style.display === 'none') {
      commentsDiv.style.display = 'block';
      toggleCommentsButton.textContent = 'Kommentare ausblenden';
    } else {
      commentsDiv.style.display = 'none';
      toggleCommentsButton.textContent = 'Kommentare anzeigen';
    }
  });
}

/**
 * Setzt einen Event-Handler für das Löschen eines Rezepts.
 * Ruft das Backend auf, aktualisiert die Anzeige und zeigt eine Toast-Nachricht.
 */
export function handleDelete(deleteButton, recipeId) {
  deleteButton.addEventListener('click', async () => {
    try {
      await deleteRecipe(recipeId); // Rezept im Backend löschen
      const updatedRecipes = await fetchRecipes(); // Neue Rezeptliste holen
      renderRecipes(updatedRecipes); // Rezepte neu anzeigen
      showToast('Rezept erfolgreich gelöscht!', 'success');
    } catch (error) {
      console.error('Fehler beim Löschen des Rezepts:', error.message);
      showToast('Fehler beim Löschen des Rezepts', 'error');
    }
  });
}

/**
 * Setzt Event-Handler für die Bewertungssterne.
 * Aktualisiert die Bewertung im Backend und zeigt eine Toast-Nachricht.
 */
export function handleRating(stars, recipeId) {
  stars.forEach(star => {
    star.addEventListener('click', async (event) => {
      const selectedRating = parseInt(event.target.dataset.value, 10);
      try {
        await updateRecipe(recipeId, { rating: selectedRating }); // Bewertung im Backend aktualisieren
        const updatedRecipes = await fetchRecipes(); // Neue Rezeptliste holen
        renderRecipes(updatedRecipes); // Rezepte neu anzeigen
        showToast('Bewertung erfolgreich aktualisiert!', 'success');
      } catch (error) {
        console.error('Fehler beim Aktualisieren der Bewertung:', error.message);
        showToast('Fehler beim Aktualisieren der Bewertung', 'error');
      }
    });
  });
}

/**
 * Setzt einen Event-Handler für das Hinzufügen eines Tags.
 * Fügt einen neuen Tag zum Rezept hinzu, aktualisiert das Backend und zeigt eine Toast-Nachricht.
 */
export function handleTags(addTagButton, tagInput, recipe, recipeId) {
  addTagButton.addEventListener('click', async () => {
    // Debugging-Ausgaben
    console.log('Recipe:', recipe);
    console.log('Recipe Tags:', recipe.tags);

    const newTag = tagInput.value.trim();
    if (newTag) {
      try {
        const updatedTags = [...(recipe.tags || []), newTag]; // Neuen Tag zum Array hinzufügen
        await updateRecipe(recipeId, { tags: updatedTags }); // Tags im Backend aktualisieren
        const updatedRecipes = await fetchRecipes(); // Neue Rezeptliste holen
        renderRecipes(updatedRecipes); // Rezepte neu anzeigen
        showToast('Tag erfolgreich hinzugefügt!', 'success');
      } catch (error) {
        console.error('Fehler beim Hinzufügen des Tags:', error.message);
        showToast('Fehler beim Hinzufügen des Tags', 'error');
      }
    }
  });
}