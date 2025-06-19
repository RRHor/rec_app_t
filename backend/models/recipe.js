import mongoose from 'mongoose';

// Rezept-Schema für MongoDB/Mongoose
const recipeSchema = new mongoose.Schema({
  tags: [String],  
  title: { type: String, required: true },
  rating: Number,
  ingredients: [String],
  description: String,  
  comment: String,
  // Sammlung als Array von Strings, damit ein Rezept in mehreren Sammlungen sein kann
  collections: [String]
});

export default mongoose.model('Recipe', recipeSchema);