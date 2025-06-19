# Frontend Inhaltsverzeichnis

## Verzeichnisstruktur


# Frontend Inhaltsverzeichnis

## Verzeichnisstruktur

frontend/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── api/
│   │   └── recipes.js
│   ├── config.js
│   ├── ui/
│   │   ├── render.js
│   │   ├── events.js
│   │   ├── editForm.js
│   │   ├── toast.js
│   │   └── template.js


---

## Dateien und Inhalte

### `index.html`
- **Beschreibung:** Haupt-HTML-Datei der Anwendung.
- **Wichtige IDs:**
  - `recipe-form`: Formular zum Hinzufügen eines neuen Rezepts.
  - `title`, `description`, `ingredients`, `rating`, `tags`, `comment`: Eingabefelder für Rezeptdetails.
  - `recipes`: Container für die Liste der Rezepte.
  - `edit-form-container`: Container für das Bearbeitungsformular.
  - `toast-container`: Container für Toast-Benachrichtigungen.

---

### `css/style.css`
- **Beschreibung:** Enthält die CSS-Stile für die Anwendung.
- **Wichtige Klassen:**
  - `.input-field`: Stile für Eingabefelder.
  - `.button`: Stile für Buttons.
  - `.toast`: Stile für Toast-Benachrichtigungen.

---

### `js/app.js`
- **Beschreibung:** Initialisiert die Anwendung und richtet Event-Listener ein.
- **Funktionen:**
  - `handleAddRecipe()`: Fügt ein neues Rezept hinzu und aktualisiert die Rezeptliste.
  - `filterByTag(tag)`: Filtert Rezepte basierend auf Tags.

---

### `js/api/recipes.js`
- **Beschreibung:** Enthält API-Funktionen für die Kommunikation mit dem Backend.
- **Funktionen:**
  - `fetchRecipes()`: Ruft alle Rezepte vom Backend ab.
  - `addRecipe(recipe)`: Sendet ein neues Rezept an das Backend.
  - `deleteRecipe(recipeId)`: Löscht ein Rezept anhand der ID.
  - `updateRecipe(recipeId, updatedData)`: Aktualisiert ein Rezept anhand der ID.
  - `filterByTag(tag)`: Führt die GET-Anfrage aus und gibt die gefilterten Rezepte zurück.

---

### `js/config.js`
- **Beschreibung:** Enthält Konfigurationswerte.
- **Variablen:**
  - `API_BASE_URL`: Basis-URL des Backends.

---

### `js/ui/render.js`
- **Beschreibung:** Rendert Rezepte im DOM.
- **Funktionen:**
  - `renderRecipes(recipes)`: Zeigt die Liste der Rezepte im DOM an.

---

### `js/ui/events.js`
- **Beschreibung:** Richtet Event-Listener für die Benutzerinteraktion ein.
- **Funktionen:**
  - `setupEventListeners()`: Initialisiert Event-Listener für das Rezeptformular und andere Interaktionen.

---

### `js/ui/editForm.js`
- **Beschreibung:** Enthält die Logik für das Bearbeitungsformular.
- **Funktionen:**
  - `openEditForm(recipe)`: Öffnet das Bearbeitungsformular für ein Rezept.

---

### `js/ui/toast.js`
- **Beschreibung:** Zeigt Toast-Benachrichtigungen an.
- **Funktionen:**
  - `showToast(message, type)`: Zeigt eine Toast-Benachrichtigung an.

---

### `js/ui/template.js`
- **Beschreibung:** Enthält Vorlagen für die Darstellung von Rezepten.
- **Funktionen:**
  - `recipeCardTemplate(recipe, tagsHTML, ingredientsHTML)`: Generiert die HTML-Vorlage für ein Rezept.

---

## Klassen und IDs

### Wichtige Klassen
- `.input-field`: Stile für Eingabefelder.
- `.button`: Stile für Buttons.
- `.toast`: Stile für Toast-Benachrichtigungen.

### Wichtige IDs
- `recipe-form`: Formular zum Hinzufügen eines neuen Rezepts.
- `title`, `description`, `ingredients`, `rating`, `tags`, `comment`: Eingabefelder für Rezeptdetails.
- `recipes`: Container für die Liste der Rezepte.
- `edit-form-container`: Container für das Bearbeitungsformular.
- `toast-container`: Container für Toast-Benachrichtigungen.

---

# Übersicht: Zusammenspiel der Frontend- und Backend-Dateien

## Szenario: Bearbeiten eines Rezeptes

### **1. Frontend**
#### **Dateien und ihre Rollen**
1. **`index.html`**
   - **Rolle:** Stellt die Struktur für das Bearbeitungsformular bereit.
   - **Wichtige IDs:**
     - `edit-form-container`: Container für das Bearbeitungsformular.
     - `edit-title`, `edit-description`, `edit-ingredients`: Eingabefelder für die Rezeptdetails.

2. **`css/style.css`**
   - **Rolle:** Stellt die Stile für das Bearbeitungsformular bereit.
   - **Wichtige Klassen:**
     - `.input-field`: Stile für die Eingabefelder.
     - `.button`: Stile für die Buttons.

3. **`js/ui/editForm.js`**
   - **Rolle:** Öffnet das Bearbeitungsformular und verarbeitet die Eingaben.
   - **Wichtige Funktion:**
     - `openEditForm(recipe)`: Füllt das Formular mit den aktuellen Rezeptdaten und ermöglicht die Bearbeitung.

4. **`js/ui/render.js`**
   - **Rolle:** Aktualisiert die Anzeige der Rezepte im DOM.
   - **Wichtige Funktion:**
     - `renderRecipes(recipes)`: Zeigt die aktualisierte Liste der Rezepte an.

5. **`js/ui/events.js`**
   - **Rolle:** Richtet Event-Listener für die Bearbeitung ein.
   - **Wichtige Funktion:**
     - `setupEventListeners()`: Initialisiert die Event-Listener für das Bearbeitungsformular.

6. **`js/ui/toast.js`**
   - **Rolle:** Zeigt Benachrichtigungen an.
   - **Wichtige Funktion:**
     - `showToast(message, type)`: Zeigt Erfolg oder Fehler beim Bearbeiten eines Rezepts an.

---

### **2. Backend**
#### **Dateien und ihre Rollen**
1. **`routes/recipes.js`**
   - **Rolle:** Definiert die API-Endpunkte für Rezepte.
   - **Wichtige Endpunkte:**
     - `PUT /recipes/:id`: Aktualisiert ein Rezept basierend auf der ID.

2. **`controllers/recipesController.js`**
   - **Rolle:** Verarbeitet die Logik für die Rezeptaktualisierung.
   - **Wichtige Funktion:**
     - `updateRecipe(req, res)`: Aktualisiert die Rezeptdaten in der Datenbank.

3. **`models/Recipe.js`**
   - **Rolle:** Definiert das Datenmodell für Rezepte.
   - **Wichtige Methode:**
     - `findByIdAndUpdate(id, updatedData)`: Aktualisiert ein Rezept in der Datenbank.

---

### **3. Ablauf: Bearbeiten eines Rezeptes**
#### **Schritt 1: Öffnen des Bearbeitungsformulars**
- **Frontend:**
  - Die Funktion `openEditForm(recipe)` in `editForm.js` wird aufgerufen, wenn der Benutzer auf den Bearbeiten-Button klickt.
  - Das Formular wird mit den aktuellen Rezeptdaten gefüllt.

#### **Schritt 2: Bearbeiten und Absenden**
- **Frontend:**
  - Der Benutzer bearbeitet die Rezeptdetails und klickt auf "Speichern".
  - Die Event-Listener in `events.js` fangen das Absenden des Formulars ab und rufen die Funktion `updateRecipe(recipeId, updatedData)` in `recipes.js` auf.

#### **Schritt 3: Aktualisierung im Backend**
- **Backend:**
  - Der Endpunkt `PUT /recipes/:id` in `routes/recipes.js` wird aufgerufen.
  - Die Logik in `recipesController.js` verarbeitet die Anfrage und aktualisiert die Rezeptdaten in der Datenbank.

#### **Schritt 4: Aktualisierung der Anzeige**
- **Frontend:**
  - Nach erfolgreicher Aktualisierung ruft das Frontend die Funktion `fetchRecipes()` in `recipes.js` auf, um die aktualisierte Liste der Rezepte zu laden.
  - Die Funktion `renderRecipes(recipes)` in `render.js` zeigt die aktualisierte Liste im DOM an.
  - Eine Erfolgsmeldung wird mit `showToast()` angezeigt.

---

### **4. Zusammenfassung der Dateiverbindungen**
| **Frontend-Datei**       | **Backend-Datei**           | **Zusammenhang**                                                                 |
|---------------------------|-----------------------------|----------------------------------------------------------------------------------|
| `editForm.js`             | `routes/recipes.js`         | Öffnet das Bearbeitungsformular und sendet die aktualisierten Daten an das Backend. |
| `events.js`               | `controllers/recipesController.js` | Fängt das Absenden des Formulars ab und ruft die Backend-Logik auf.              |
| `render.js`               | `models/Recipe.js`          | Aktualisiert die Anzeige basierend auf den Daten aus der Datenbank.              |
| `toast.js`                | -                           | Zeigt Erfolg oder Fehler beim Bearbeiten eines Rezepts an.                       |

---

# Übersicht: Mögliche Request-Anfragen und involvierte Dateien/Funktionen

## **1. GET-Anfrage: Alle Rezepte abrufen**
### **Beschreibung:**
Ruft alle Rezepte vom Backend ab und zeigt sie im Frontend an.

### **Request:**
- **Methode:** `GET`
- **Endpunkt:** `/recipes`

### **Involvierte Dateien und Funktionen:**
#### **Frontend:**
- **`js/api/recipes.js`:**
  - `fetchRecipes()`: Führt die GET-Anfrage aus und gibt die Rezeptdaten zurück.
- **`js/ui/render.js`:**
  - `renderRecipes(recipes)`: Zeigt die Liste der Rezepte im DOM an.

#### **Backend:**
- **`routes/recipes.js`:**
  - Endpunkt `GET /recipes`: Leitet die Anfrage an den Controller weiter.
- **`controllers/recipesController.js`:**
  - `getRecipes(req, res)`: Holt die Rezeptdaten aus der Datenbank.
- **`models/Recipe.js`:**
  - `find()`: Holt alle Rezepte aus der Datenbank.

---

## **2. POST-Anfrage: Neues Rezept hinzufügen**
### **Beschreibung:**
Sendet ein neues Rezept an das Backend und aktualisiert die Rezeptliste im Frontend.

### **Request:**
- **Methode:** `POST`
- **Endpunkt:** `/recipes`

### **Involvierte Dateien und Funktionen:**
#### **Frontend:**
- **`js/api/recipes.js`:**
  - `addRecipe(recipe)`: Führt die POST-Anfrage aus und sendet die Rezeptdaten.
- **`js/ui/events.js`:**
  - `setupEventListeners()`: Fängt das Absenden des Formulars ab und ruft `addRecipe()` auf.
- **`js/ui/render.js`:**
  - `renderRecipes(recipes)`: Aktualisiert die Anzeige der Rezepte im DOM.

#### **Backend:**
- **`routes/recipes.js`:**
  - Endpunkt `POST /recipes`: Leitet die Anfrage an den Controller weiter.
- **`controllers/recipesController.js`:**
  - `createRecipe(req, res)`: Speichert das neue Rezept in der Datenbank.
- **`models/Recipe.js`:**
  - `create(recipeData)`: Fügt das Rezept in die Datenbank ein.

---

## **3. PUT-Anfrage: Rezept bearbeiten**
### **Beschreibung:**
Aktualisiert ein bestehendes Rezept basierend auf der ID.

### **Request:**
- **Methode:** `PUT`
- **Endpunkt:** `/recipes/:id`

### **Involvierte Dateien und Funktionen:**
#### **Frontend:**
- **`js/api/recipes.js`:**
  - `updateRecipe(recipeId, updatedData)`: Führt die PUT-Anfrage aus und sendet die aktualisierten Rezeptdaten.
- **`js/ui/editForm.js`:**
  - `openEditForm(recipe)`: Öffnet das Bearbeitungsformular und füllt es mit den aktuellen Rezeptdaten.
- **`js/ui/events.js`:**
  - `setupEventListeners()`: Fängt das Absenden des Bearbeitungsformulars ab und ruft `updateRecipe()` auf.
- **`js/ui/render.js`:**
  - `renderRecipes(recipes)`: Aktualisiert die Anzeige der Rezepte im DOM.

#### **Backend:**
- **`routes/recipes.js`:**
  - Endpunkt `PUT /recipes/:id`: Leitet die Anfrage an den Controller weiter.
- **`controllers/recipesController.js`:**
  - `updateRecipe(req, res)`: Aktualisiert die Rezeptdaten in der Datenbank.
- **`models/Recipe.js`:**
  - `findByIdAndUpdate(id, updatedData)`: Aktualisiert das Rezept in der Datenbank.

---

## **4. DELETE-Anfrage: Rezept löschen**
### **Beschreibung:**
Löscht ein Rezept basierend auf der ID.

### **Request:**
- **Methode:** `DELETE`
- **Endpunkt:** `/recipes/:id`

### **Involvierte Dateien und Funktionen:**
#### **Frontend:**
- **`js/api/recipes.js`:**
  - `deleteRecipe(recipeId)`: Führt die DELETE-Anfrage aus und löscht das Rezept.
- **`js/ui/events.js`:**
  - `setupEventListeners()`: Fängt das Löschen eines Rezepts ab und ruft `deleteRecipe()` auf.
- **`js/ui/render.js`:**
  - `renderRecipes(recipes)`: Aktualisiert die Anzeige der Rezepte im DOM.

#### **Backend:**
- **`routes/recipes.js`:**
  - Endpunkt `DELETE /recipes/:id`: Leitet die Anfrage an den Controller weiter.
- **`controllers/recipesController.js`:**
  - `deleteRecipe(req, res)`: Löscht das Rezept aus der Datenbank.
- **`models/Recipe.js`:**
  - `findByIdAndDelete(id)`: Entfernt das Rezept aus der Datenbank.

---

## **5. GET-Anfrage: Rezepte nach Tag filtern**
### **Beschreibung:**
Filtert Rezepte basierend auf einem Tag.

### **Request:**
- **Methode:** `GET`
- **Endpunkt:** `/recipes/tags/:tag`

### **Involvierte Dateien und Funktionen:**
#### **Frontend:**
- **`js/api/recipes.js`:**
  - `filterByTag(tag)`: Führt die GET-Anfrage aus und gibt die gefilterten Rezepte zurück.
- **`js/ui/render.js`:**
  - `renderRecipes(recipes)`: Zeigt die gefilterte Liste der Rezepte im DOM an.

#### **Backend:**
- **`routes/recipes.js`:**
  - Endpunkt `GET /recipes/tags/:tag`: Leitet die Anfrage an den Controller weiter.
- **`controllers/recipesController.js`:**
  - `getRecipesByTag(req, res)`: Holt die Rezepte basierend auf dem Tag aus der Datenbank.
- **`models/Recipe.js`:**
  - `find({ tags: tag })`: Filtert die Rezepte basierend auf dem Tag.

---

## Zusammenfassung der Request-Anfragen
| **Request**               | **Methode** | **Endpunkt**             | **Frontend-Funktion**          | **Backend-Funktion**          |
|---------------------------|-------------|--------------------------|---------------------------------|--------------------------------|
| Alle Rezepte abrufen      | `GET`       | `/recipes`               | `fetchRecipes()`               | `getRecipes(req, res)`         |
| Neues Rezept hinzufügen   | `POST`      | `/recipes`               | `addRecipe(recipe)`            | `createRecipe(req, res)`       |
| Rezept bearbeiten         | `PUT`       | `/recipes/:id`           | `updateRecipe(recipeId, data)` | `updateRecipe(req, res)`       |
| Rezept löschen            | `DELETE`    | `/recipes/:id`           | `deleteRecipe(recipeId)`       | `deleteRecipe(req, res)`       |
| Rezepte nach Tag filtern  | `GET`       | `/recipes/tags/:tag`     | `filterByTag(tag)`             | `getRecipesByTag(req, res)`    |


