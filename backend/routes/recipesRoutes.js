// definiert die API-Endpunkte für Rezepte

// Importiere die benötigten Module
import express from "express"; // Express wird verwendet, um HTTP-Routen zu erstellen
import Recipe from "../models/Recipe.js"; // Importiere das Mongoose-Modell für Rezepte

// Erstelle einen Router
const router = express.Router(); // Der Router wird verwendet, um API-Endpunkte zu definieren

// GET /recipes - Alle Rezepte abrufen
// Diese Route wird verwendet, um alle Rezepte aus der Datenbank abzurufen
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find(); // Abrufen aller Rezepte aus der MongoDB-Datenbank
    res.json(recipes); // Sende die Rezepte als JSON-Antwort zurück
  } catch (err) {
    res
      .status(500)
      .json({ message: "Fehler beim Abrufen der Rezepte", error: err.message });
  }
});

// POST /recipes - Neues Rezept hinzufügen
// Diese Route wird verwendet, um ein neues Rezept in der Datenbank zu speichern
router.post("/", async (req, res) => {
  try {
    const recipe = new Recipe(req.body); // Erstelle ein neues Rezept-Objekt mit den Daten aus der Anfrage
    const savedRecipe = await recipe.save(); // Speichere das Rezept in der Datenbank
    res.status(201).json(savedRecipe); // Sende das gespeicherte Rezept als JSON-Antwort zurück
  } catch (err) {
    res.status(400).json({
      message: "Fehler beim Hinzufügen des Rezepts",
      error: err.message,
    });
  }
});

// DELETE /recipes/:id - Rezept löschen
// Diese Route wird verwendet, um ein Rezept anhand seiner ID zu löschen
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extrahiere die ID aus der URL
    await Recipe.findByIdAndDelete(id); // Lösche das Rezept mit der angegebenen ID aus der Datenbank
    res.status(204).send(); // Sende eine Antwort ohne Inhalt zurück (204 No Content)
  } catch (err) {
    res
      .status(500)
      .json({ message: "Fehler beim Löschen des Rezepts", error: err.message });
  }
});

// PUT /recipes/:id - Rezept aktualisieren
router.put("/:id", async (req, res) => {
  // console.log("PUT-Anfrage erhalten"); // Debugging
  // console.log("Rezept-ID:", req.params.id); // Debugging
  // console.log("Anfrage-Body:", req.body); // Debugging

  try {
    const { id } = req.params;
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedRecipe) {
      console.log("Rezept nicht gefunden"); // Debugging
      return res.status(404).json({ message: "Rezept nicht gefunden" });
    }

    res.status(200).json(updatedRecipe);
  } catch (error) {
    console.error("Fehler beim Aktualisieren:", error.message); // Debugging
    res.status(400).json({
      message: "Fehler beim Aktualisieren des Rezepts",
      error: error.message,
    });
  }
});

router.get('/tags/:tag', async (req, res) => {
  try {
    console.log('GET /tags/:tag aufgerufen'); // Debugging
    console.log('Tag:', req.params.tag); // Debugging

    const { tag } = req.params;
    const recipes = await Recipe.find({ tags: tag });
    console.log('Gefundene Rezepte:', recipes); // Debugging

    res.status(200).json(recipes);
  } catch (error) {
    console.error('Fehler beim Abrufen der Rezepte nach Tag:', error.message);
    res.status(500).json({ message: 'Fehler beim Abrufen der Rezepte nach Tag', error: error.message });
  }
});

// Exportiere den Router, damit er in anderen Dateien verwendet werden kann
export default router;
