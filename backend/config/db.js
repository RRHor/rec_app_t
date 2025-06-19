// enthält die MongoDB-Verbindungslogik


import dotenv from 'dotenv';
// lade die Umgebungsvariablen aus der .env-Datei
dotenv.config(); 


// Importiere das Mongoose-Modul
import mongoose from 'mongoose';

// Funktion, um die Verbindung zur MongoDB-Datenbank herzustellen
const connectDB = async () => {
  try {
    // Stelle die Verbindung zur MongoDB-Datenbank her
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Verwendet den neuen URL-Parser von Mongoose
      useUnifiedTopology: true, // Aktiviert den neuen Unified Topology Layer
    });

    // Wenn die Verbindung erfolgreich ist, gib eine Erfolgsmeldung aus
    console.log('MongoDB verbunden');
  } catch (err) {
    // Wenn ein Fehler auftritt, gib die Fehlermeldung aus
    console.error('MongoDB-Verbindungsfehler:', err);

    // Beende den Prozess mit einem Fehlercode
    process.exit(1);
  }
};

// Exportiere die Funktion, damit sie in anderen Dateien verwendet werden kann
export default connectDB;