/**
 * Erzeugt das HTML-Template für eine Rezeptkarte.
 * @param {Object} recipe - Das Rezept-Objekt mit allen Daten.
 * @param {string} tagsHTML - (Optional) HTML für Tags (wird aktuell nicht mehr benötigt).
 * @param {string} ingredientsHTML - HTML für die Zutatenliste.
 * @returns {string} HTML-String für die Rezeptkarte.
 */
export function recipeCardTemplate(recipe, tagsHTML, ingredientsHTML) {
  return `
    <div class="recipe-content relative">
      <!-- Vertikale Bewertungssterne in der oberen linken Ecke -->
      <div class="panel-stars-vertical">
        ${[1, 2, 3, 4, 5].map(star => `
          <span class="star ${star <= recipe.rating ? 'text-yellow-400' : 'text-gray-400'} cursor-pointer" data-value="${star}">
            ★
          </span>
        `).join('<br>')}
      </div>
      <!-- Tags und Tag-Hinzufügen-Feld nebeneinander -->
      <div class="comic-tags flex items-center flex-wrap gap-2 mb-2">
        ${recipe.tags.map(tag => `<span class="comic-tag">${tag}</span>`).join('')}
        <div class="add-tag flex items-center ml-2">
          <input type="text" class="tag-input border-gray-300 rounded-md shadow-sm focus:ring-[#A05A89] focus:border-[#A05A89] mr-1" placeholder="Neuen Tag hinzufügen" />
          <button class="add-tag-button bg-green-400 text-white border-4 border-black px-2 py-1 rounded-md shadow-[3px_3px_0_#000] hover:scale-105 transition-all duration-300">
            Hinzufügen
          </button>
        </div>
      </div>
      <!-- Titel -->
      <div class="flex items-center gap-4 mb-2">
        <h2 class="recipe-title text-xl font-bold text-[#6C3D84] m-0">${recipe.title}</h2>
      </div>
      <!-- Sammlungshinweis unter dem Titel -->
      ${recipe.collections && recipe.collections.length
        ? `<div class="collection-label">Sammlungen: ${recipe.collections.join(', ')}</div>`
        : ''
      }
      <!-- Beschreibung des Rezepts -->
      <p class="recipe-description text-gray-700">${recipe.description}</p>
      <!-- Zutatenliste -->
      <ul class="recipe-ingredients list-disc pl-5 text-gray-700">
        ${ingredientsHTML}
      </ul>
      <!-- Button zum Anzeigen der Kommentare -->
      <button class="toggle-comments bg-blue-400 text-white border-4 border-black px-4 py-2 rounded-full shadow-[3px_3px_0_#000] hover:scale-105 transition-all duration-300">
        Kommentare anzeigen
      </button>
      <!-- Kommentarbereich (standardmäßig ausgeblendet) -->
      <div class="comments text-gray-600 italic mt-2" style="display: none;">
        ${recipe.comment || 'Keine Kommentare vorhanden.'}
      </div>
      <!-- Button zum Bearbeiten des Rezepts -->
      <button class="edit-button bg-pink-400 text-white border-4 border-black px-4 py-2 rounded-full shadow-[3px_3px_0_#000] hover:scale-105 transition-all duration-300">
        Bearbeiten
      </button>
      <!-- Button zum Löschen des Rezepts -->
      <button class="delete-button bg-red-400 text-white border-4 border-black px-4 py-2 rounded-full shadow-[3px_3px_0_#000] hover:scale-105 transition-all duration-300">
        Löschen
      </button>
    </div>
  `;
}