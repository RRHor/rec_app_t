export async function getRecipes(req, res) {
  try {
    const recipes = await Recipe.find();
    const recipesWithTags = recipes.map(recipe => ({
      ...recipe.toObject(),
      tags: recipe.tags || [], // Standardwert setzen
    }));
    res.status(200).json(recipesWithTags);
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Abrufen der Rezepte', error: error.message });
  }
}

export async function createRecipe(req, res) {
  try {
    const recipeData = {
      ...req.body,
      tags: req.body.tags || [], // Standardwert setzen
    };
    const newRecipe = await Recipe.create(recipeData);
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Erstellen des Rezepts', error: error.message });
  }
}