const recipe = applePieRecipe.recipe;

function createIngredientsList(ingredients) {
  const list = document.createElement("ul");
  ingredients.forEach(ingredient => {
    const listItem = document.createElement("li");
    listItem.innerText = `${ingredient.quantity} ${ingredient.unit} ${ingredient.name}`;
    if (ingredient.preparation) {
      listItem.innerText += ` (${ingredient.preparation})`;
    }
    list.appendChild(listItem);
  });
  return list;
}

function createInstructionsList(instructions) {
  const list = document.createElement("ol");
  instructions.forEach(instruction => {
    const listItem = document.createElement("li");
    listItem.innerText = instruction;
    list.appendChild(listItem);
  });
  return list;
}

function displayRecipe(recipe) {
  const container = document.getElementById("recipe-container");

  const title = document.createElement("h1");
  title.innerText = recipe.title;
  container.appendChild(title);

  const yieldInfo = document.createElement("p");
  yieldInfo.innerText = `Yield: ${recipe.yield.quantity} ${recipe.yield.unit}`;
  container.appendChild(yieldInfo);

  const prepTime = document.createElement("p");
  prepTime.innerText = `Prep Time: ${recipe.prep_time.quantity} ${recipe.prep_time.unit}`;
  container.appendChild(prepTime);

  const cookTime = document.createElement("p");
  cookTime.innerText = `Cook Time: ${recipe.cook_time.quantity} ${recipe.cook_time.unit}`;
  container.appendChild(cookTime);

  const ingredientsHeader = document.createElement("h2");
  ingredientsHeader.innerText = "Ingredients";
  container.appendChild(ingredientsHeader);

  const ingredientsList = createIngredientsList(recipe.ingredients);
  container.appendChild(ingredientsList);

  const instructionsHeader = document.createElement("h2");
  instructionsHeader.innerText = "Instructions";
  container.appendChild(instructionsHeader);

  const instructionsList = createInstructionsList(recipe.instructions);
  container.appendChild(instructionsList);
}

displayRecipe(recipe);
