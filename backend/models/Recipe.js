// enthält das Mongoose-Schema für Rezepte

import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Ein Titel ist erforderlich'], // Titel ist erforderlich
    maxlength: [200, 'Der Titel darf maximal 200 Zeichen lang sein'], // Maximale Länge
  },
  description: {
    type: String,
    maxlength: [10000, 'Die Beschreibung darf maximal 1000 Zeichen lang sein'], // Maximale Länge
  },
  ingredients: {
    type: [String],
    required: [true, 'Mindestens eine Zutat ist erforderlich'], // Zutaten sind erforderlich
    validate: {
      validator: (v) => v.length > 0, // Mindestens eine Zutat
      message: 'Das Zutatenfeld darf nicht leer sein',
    },
  },
  comment: {
    type: String,
    maxlength: [500, 'Der Kommentar darf maximal 500 Zeichen lang sein'], // Maximale Länge
  },
  rating: {
    type: Number,
    min: [0, 'Die Bewertung muss mindestens 1 sein'], // Mindestbewertung
    max: [5, 'Die Bewertung darf maximal 5 sein'], // Maximalbewertung
  },
  tags: {type: [String], default: [], }// Neues Feld für Schlagwörter}
});

export default mongoose.model('Recipe', recipeSchema);