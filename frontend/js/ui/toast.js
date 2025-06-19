/**
 * Zeigt eine Toast-Benachrichtigung im Browser an.
 * @param {string} message - Die anzuzeigende Nachricht.
 * @param {string} [type='success'] - Der Typ der Nachricht ('success' oder 'error').
 */
export function showToast(message, type = 'success') {
  // Container-Element für Toasts holen (muss im HTML existieren)
  const toastContainer = document.getElementById('toast-container');

  // Neues Toast-Element erstellen
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.className = `toast ${type}`;

  // Grundlegendes Styling für das Toast
  toast.style.padding = '10px 20px';
  toast.style.marginBottom = '10px';
  toast.style.borderRadius = '5px';
  toast.style.color = '#fff';
  toast.style.fontSize = '14px';
  toast.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
  toast.style.transition = 'opacity 0.5s ease';

  // Hintergrundfarbe je nach Typ setzen
  if (type === 'success') {
    toast.style.backgroundColor = '#4caf50'; // Grün für Erfolg
  } else if (type === 'error') {
    toast.style.backgroundColor = '#f44336'; // Rot für Fehler
  }

  // Toast dem Container hinzufügen
  toastContainer.appendChild(toast);

  // Toast nach 3 Sekunden ausblenden und entfernen
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}