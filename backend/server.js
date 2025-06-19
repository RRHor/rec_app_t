// startet den Express-Server und bindet die Routen ein

// Importiere die benötigten Module
import express from 'express'; // Express ist ein Framework für Node.js, das die Erstellung von Webservern erleichtert
import cors from 'cors'; // CORS (Cross-Origin Resource Sharing) erlaubt Anfragen von anderen Domains
import bodyParser from 'body-parser'; // Body-Parser hilft, JSON-Daten aus HTTP-Anfragen zu verarbeiten
import connectDB from './config/db.js'; // Importiere die MongoDB-Verbindungslogik
import router from './routes/recipesRoutes.js'; // Importiere die Routen für Rezepte

// Initialisiere die Express-App
const app = express();

// Middleware einrichten
app.use(cors()); // Erlaubt Anfragen von anderen Domains (z. B. vom Frontend)
app.use(express.json()); // Verarbeitet JSON-Daten aus dem Request-Body

// MongoDB-Datenbank verbinden
connectDB(); // Stellt die Verbindung zur MongoDB-Datenbank her

// API-Routen einbinden
// Alle Anfragen, die mit "/recipes" beginnen, werden an die Routen in "routes/recipes.js" weitergeleitet
app.use('/recipes', router);

// Port definieren, auf dem der Server laufen soll
const PORT = 5000;

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});