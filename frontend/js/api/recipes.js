import { API_BASE_URL } from '../config.js'; // Basis-URL des Backends aus der Konfigurationsdatei importieren
import { showToast } from '../ui/toast.js'; // Toast-Benachrichtigungen importieren

// Funktion: Alle Rezepte vom Backend abrufen
export async function fetchRecipes() {
  try {
    const response = await fetch(`${API_BASE_URL}/recipes`); // GET-Anfrage an /recipes
    if (!response.ok) {
      throw new Error('Fehler beim Abrufen der Rezepte');
    }
    return await response.json(); // Rezepte als JSON zurückgeben
  } catch (error) {
    console.error('Fehler beim Abrufen der Rezepte:', error.message);
    throw error;
  }
}

// Funktion: Neues Rezept an das Backend senden
export async function addRecipe(recipe) {
  try {
    const response = await fetch(`${API_BASE_URL}/recipes`, {
      method: 'POST', // POST-Anfrage an /recipes
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe), // Rezeptdaten als JSON senden
    });

    if (!response.ok) {
      // Fehlerbehandlung und Toast anzeigen
      let errorMessage = 'Fehler beim Hinzufügen des Rezepts';
      try {
        const error = await response.json();
        errorMessage = error.message;
      } catch (err) {
        console.error('Fehler beim Parsen der Fehlermeldung:', err.message);
      }
      showToast(errorMessage, 'error');
      throw new Error(errorMessage);
    }

    const savedRecipe = await response.json(); // Erfolgreich gespeichertes Rezept
    console.log('Rezept erfolgreich gespeichert:', savedRecipe);
    showToast('Rezept erfolgreich hinzugefügt!', 'success');
    return savedRecipe;
  } catch (error) {
    console.error('Fehler beim Hinzufügen des Rezepts:', error.message);
    throw error;
  }
}

// Funktion: Rezept anhand der ID löschen
export async function deleteRecipe(recipeId) {
  try {
    const response = await fetch(`${API_BASE_URL}/recipes/${recipeId}`, {
      method: 'DELETE', // DELETE-Anfrage an /recipes/:id
    });

    if (!response.ok) {
      throw new Error('Fehler beim Löschen des Rezepts');
    }

    console.log(`Rezept mit ID ${recipeId} erfolgreich gelöscht`);
    showToast('Rezept erfolgreich gelöscht!', 'success');
    return true;
  } catch (error) {
    console.error('Fehler beim Löschen des Rezeptes:', error.message);
    showToast('Fehler beim Löschen des Rezepts', 'error');
    throw error;
  }
}

// Funktion: Rezept aktualisieren
export async function updateRecipe(recipeId, updatedData) {
  try {
    const response = await fetch(`${API_BASE_URL}/recipes/${recipeId}`, {
      method: 'PUT', // PUT-Anfrage an /recipes/:id
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData), // Aktualisierte Rezeptdaten senden
    });

    if (!response.ok) {
      // Fehlerbehandlung und Toast anzeigen
      let errorMessage = 'Fehler beim Aktualisieren des Rezepts';
      try {
        const error = await response.json();
        errorMessage = error.message;
      } catch (err) {
        console.error('Fehler beim Parsen der Fehlermeldung:', err.message);
      }
      showToast(errorMessage, 'error');
      throw new Error(errorMessage);
    }

    const updatedRecipe = await response.json(); // Erfolgreich aktualisiertes Rezept
    console.log('Rezept erfolgreich aktualisiert:', updatedRecipe);
    showToast('Rezept erfolgreich aktualisiert!', 'success');
    return updatedRecipe;
  } catch (error) {
    console.error('Fehler beim Aktualisieren des Rezepts:', error.message);
    throw error;
  }
}