import { recipeCardTemplate } from './template.js';
import { openEditFormInCard } from './editForm.js';
import { handleCommentsToggle, handleDelete, handleRating, handleTags } from './eventHandler.js';
import { fetchRecipes } from "../api/recipes.js";
import { showToast } from './toast.js';

/**
 * Rendert die Rezepte als Comic-Panels in das Grid.
 * Die Panels werden unterschiedlich groß, leicht gedreht und mit zufälligen Abständen versehen,
 * um einen "unordentlichen" Comic-Look zu erzeugen.
 * @param {Array} recipes - Array mit Rezept-Objekten
 */
export function renderComicPanels(recipes) {
  const panelsContainer = document.getElementById('comic-panels');
  if (!panelsContainer) return;
  panelsContainer.innerHTML = '';

  // Achtung: Überschneidungen vermeiden! Jede Position darf nur EINEM Panel zugewiesen werden.
  const bentoPositions = [
    { col: '1 / 3', row: '1 / 3' }, // columns 1-2, rows 1-2
    { col: '3 / 5', row: '1 / 2' }, // columns 3-4, row 1
    { col: '3 / 4', row: '2 / 3' }, // column 3, row 2
    { col: '4 / 5', row: '2 / 4' }, // column 4, rows 2-3
    { col: '1 / 2', row: '3 / 5' }, // column 1, rows 3-4
    { col: '2 / 4', row: '3 / 4' }, // columns 2-3, row 3
    { col: '2 / 4', row: '4 / 5' }, // columns 2-3, row 4
    { col: '4 / 5', row: '4 / 5' }, // column 4, row 4
  ];

  recipes.forEach((recipe, idx) => {
    // Panelgröße dynamisch bestimmen (z.B. nach Textlänge/Zutatenanzahl)
    let heightClass = 'short';
    const textLength = (recipe.description?.length || 0) + (recipe.ingredients?.join(',').length || 0);
    if (textLength > 400 || (recipe.ingredients && recipe.ingredients.length > 10)) {
      heightClass = 'tall';
    } else if (textLength > 200 || (recipe.ingredients && recipe.ingredients.length > 5)) {
      heightClass = 'medium';
    }

    // Panel-Element erzeugen
    const recipeElement = document.createElement('div');
    recipeElement.className = `comic-panel ${heightClass}`;
    recipeElement.innerHTML = recipeCardTemplate(recipe);

    // --- Bento-Position zuweisen (falls vorhanden) ---
    // Achtung: Überschneidungen vermeiden! Prüfe, dass keine zwei Panels dieselbe Position bekommen.
    if (bentoPositions[idx]) {
      recipeElement.style.gridColumn = bentoPositions[idx].col;
      recipeElement.style.gridRow = bentoPositions[idx].row;
    } else {
      // Für Panels ohne feste Position: zufällige Spanne und Comic-Look
      // (Optional: Du kannst hier auch gridColumn/gridRow zufällig setzen)
    }

    // --- Comic-Look: Unordnung erzeugen ---

    // 1. Zufällige Drehung zwischen -1 und +1 Grad (dezenter Comic-Look)
    const rotation = (Math.random() - 0.5) * 2; // -1 bis +1 Grad
    recipeElement.style.transform = `rotate(${rotation}deg)`;

    // 2. Zufällige Außenabstände (Margin) für "unordentliche" Gaps
    // Achtung: Zu große Margins können Panels aus dem Grid schieben!
    const marginTop = Math.random() * 16;   // bis 16px
    const marginLeft = Math.random() * 16;  // bis 16px
    recipeElement.style.marginTop = `${marginTop}px`;
    recipeElement.style.marginLeft = `${marginLeft}px`;

    // 3. Optional: Unterschiedliche Schatten (Comic-Effekt)
    // Beispiel: recipeElement.style.boxShadow = `${4 + Math.random()*4}px ${4 + Math.random()*4}px 0 #000`;

    // Panel ins Grid einfügen
    panelsContainer.appendChild(recipeElement);

    // --- Event-Handler für Interaktivität ---

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

/*
Wichtige Hinweise:
- Panels dürfen sich im Grid nicht überschneiden! Prüfe die bentoPositions auf Eindeutigkeit.
- Zufällige Margins simulieren unterschiedliche Gaps, können aber bei zu großen Werten das Layout sprengen.
- Für ein echtes Bento-Layout: Für alle Panels eindeutige gridColumn/gridRow vergeben oder für die restlichen Panels gezielt Spans und Positionen zufällig wählen.
- Panels sollten kein position: absolute haben (außer für Deko wie Sterne).
*/