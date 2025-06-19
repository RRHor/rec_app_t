import { updateRecipe, fetchRecipes } from "../api/recipes.js";
import { renderRecipes } from "./render.js";
import { showToast } from './toast.js';
import { recipeCardTemplate } from './template.js';

// Funktion: Bearbeitungsformular als Overlay öffnen (separates Formular)
export function openEditForm(recipe) {
  const editFormContainer = document.getElementById('edit-form-container');
  editFormContainer.style.display = 'block';

  // Eingabefelder im Bearbeitungsformular holen
  const titleInput = document.getElementById('edit-title');
  const descriptionInput = document.getElementById('edit-description');
  const ingredientsInput = document.getElementById('edit-ingredients');
  const tagsInput = document.getElementById('edit-tags');

  // Felder mit aktuellen Rezeptdaten füllen
  titleInput.value = recipe.title;
  descriptionInput.value = recipe.description;
  ingredientsInput.value = recipe.ingredients.join(', ');
  tagsInput.value = recipe.tags.join(', ');

  const saveButton = document.getElementById('save-edit');
  if (!saveButton) {
    console.error('Speichern-Button nicht gefunden!');
    return;
  }

  // Beim Speichern: Rezept aktualisieren und Liste neu laden
  saveButton.addEventListener('click', async () => {
    const updatedRecipe = {
      title: titleInput.value.trim(),
      description: descriptionInput.value.trim(),
      ingredients: ingredientsInput.value.split(',').map(i => i.trim()),
      tags: tagsInput.value.split(',').map(t => t.trim()),
    };

    try {
      await updateRecipe(recipe._id, updatedRecipe);
      const updatedRecipes = await fetchRecipes();
      renderRecipes(updatedRecipes);
      showToast('Rezept erfolgreich bearbeitet!', 'success');
      editFormContainer.style.display = 'none';
    } catch (error) {
      console.error('Fehler beim Bearbeiten des Rezepts:', error.message);
      showToast('Fehler beim Bearbeiten des Rezepts', 'error');
    }
  });

  // Beim Abbrechen: Formular ausblenden
  const cancelButton = document.getElementById('cancel-edit');
  cancelButton.addEventListener('click', () => {
    editFormContainer.style.display = 'none';
  });
}

// Funktion: Bearbeitungsfeld direkt in der Rezeptkarte als Vollbild anzeigen
export function openEditFormInCard(recipeElement, recipe) {
  // Vollbild-Modus aktivieren
  recipeElement.classList.add('fullscreen-edit');
  document.body.classList.add('edit-modal-open');
  recipeElement.setAttribute('role', 'region');
  recipeElement.setAttribute('aria-label', 'Rezept bearbeiten');

  // Ursprüngliches Card-HTML einfügen
  recipeElement.innerHTML = recipeCardTemplate(recipe, '', '');

  // Eingabefelder für Titel, Beschreibung, Zutaten erzeugen
  const { wrapper: titleWrapper, input: titleInput } = createLabeledInput(
    'edit-title-inline', 'Titel', 'text', recipe.title, 'input-field input-title w-full'
  );
  const { wrapper: descWrapper, input: descInput } = createLabeledInput(
    'edit-desc-inline', 'Beschreibung', 'textarea', recipe.description, 'input-field input-description w-full'
  );
  const { wrapper: ingrWrapper, input: ingredientsInput } = createLabeledInput(
    'edit-ingredients-inline', 'Zutaten (Komma getrennt)', 'text', recipe.ingredients.join(', '), 'input-field input-ingredients w-full'
  );

  // Tags als Chips bearbeiten (mit Entfernen und Hinzufügen)
  let tags = [...recipe.tags];

  // Funktion zum Rendern der Tag-Chips und des Tag-Inputs
  function renderTagChips() {
    tagsWrapper.innerHTML = '';
    tags.forEach((tag, idx) => {
      const chip = document.createElement('span');
      chip.className = 'comic-tag flex items-center';
      chip.textContent = tag;

      // Button zum Entfernen eines Tags
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.setAttribute('aria-label', `Tag "${tag}" entfernen`);
      removeBtn.textContent = '✖';
      removeBtn.className = 'ml-2 text-red-500 font-bold bg-transparent border-none cursor-pointer';
      removeBtn.onclick = () => {
        tags.splice(idx, 1);
        renderTagChips();
      };

      chip.appendChild(removeBtn);
      tagsWrapper.appendChild(chip);
    });

    // Eingabefeld für neuen Tag (Enter fügt hinzu)
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Tag hinzufügen';
    input.className = 'comic-tag input w-auto';
    input.setAttribute('aria-label', 'Neuen Tag hinzufügen');
    input.onkeydown = (e) => {
      if (e.key === 'Enter' && input.value.trim()) {
        const newTag = input.value.trim();
        if (!tags.includes(newTag)) {
          tags.push(newTag);
          renderTagChips();
        }
        input.value = '';
      }
    };
    tagsWrapper.appendChild(input);
  }

  // Container für die Tag-Chips
  const tagsWrapper = document.createElement('div');
  tagsWrapper.className = 'comic-tags mb-2';
  renderTagChips();

  // Tags ganz oben in die Card einfügen
  recipeElement.prepend(tagsWrapper);

  // Button-Container für Speichern und Abbrechen
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'mt-4 flex gap-2';

  // Speichern-Button
  const saveButton = document.createElement('button');
  saveButton.textContent = 'Speichern';
  saveButton.className = 'button mr-2';
  saveButton.type = 'button';
  saveButton.setAttribute('aria-label', 'Rezept speichern');

  // Abbrechen-Button
  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Abbrechen';
  cancelButton.className = 'button';
  cancelButton.type = 'button';
  cancelButton.setAttribute('aria-label', 'Bearbeiten abbrechen');

  buttonContainer.appendChild(saveButton);
  buttonContainer.appendChild(cancelButton);
  recipeElement.appendChild(buttonContainer);

  // Fokus auf das erste Eingabefeld setzen
  titleInput.focus();

  // Beim Speichern: Rezept aktualisieren und alle Rezepte neu laden
  saveButton.addEventListener('click', async () => {
    const updatedRecipe = {
      title: titleInput.value.trim(),
      description: descInput.value.trim(),
      ingredients: ingredientsInput.value.split(',').map(i => i.trim()),
      tags: tags,
    };
    try {
      await updateRecipe(recipe._id, updatedRecipe);
      const updatedRecipes = await fetchRecipes();
      renderRecipes(updatedRecipes);
      showToast('Rezept erfolgreich bearbeitet!', 'success');
    } catch (error) {
      showToast('Fehler beim Bearbeiten des Rezepts', 'error');
    } finally {
      recipeElement.classList.remove('fullscreen-edit');
      document.body.classList.remove('edit-modal-open');
    }
  });

  // Beim Abbrechen: Vollbild-Modus verlassen und alle Rezepte neu laden
  cancelButton.addEventListener('click', async () => {
    recipeElement.classList.remove('fullscreen-edit');
    document.body.classList.remove('edit-modal-open');
    const updatedRecipes = await fetchRecipes();
    renderRecipes(updatedRecipes);
  });
}

// Hilfsfunktion: Erzeugt ein Eingabefeld mit Label für Barrierefreiheit
function createLabeledInput(id, labelText, inputType, value, className) {
  const label = document.createElement('label');
  label.setAttribute('for', id);
  label.textContent = labelText;

  const input = document.createElement(inputType === 'textarea' ? 'textarea' : 'input');
  input.id = id;
  input.className = className;
  if (inputType !== 'textarea') input.type = inputType;
  input.value = value;
  input.setAttribute('aria-label', labelText);

  const wrapper = document.createElement('div');
  wrapper.className = 'mb-2';
  wrapper.appendChild(label);
  wrapper.appendChild(input);

  return { wrapper, input };
}