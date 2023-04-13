const recipes = [
  { name: "Apple Pie", data: applePieRecipe.recipe },
  { name: "Chocolate Chip Cookies", data: newRecipe.recipe },
  { name: "Truffled Bresse chicken", data: truffledBresseChickenRecipe.recipe },
  { name: "European Apple Pie", data: europeanApplePieRecipe.recipe }
];

function createIngredientsList(ingredients) {
  const list = document.createElement("ul");
  list.classList.add("list-unstyled");
  ingredients.forEach(ingredient => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<i class="fas fa-utensils me-2"></i>${ingredient.quantity} ${ingredient.unit} ${ingredient.name}`;
    if (ingredient.preparation) {
      listItem.innerHTML += ` (${ingredient.preparation})`;
    }
    list.appendChild(listItem);
  });
  return list;
}

function createInstructionsList(instructions) {
  const list = document.createElement("ol");
  list.classList.add("list-group", "list-group-numbered");
  instructions.forEach((instruction, index) => {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.innerHTML = `<i class="fas fa-chevron-right me-2"></i>${instruction}`;
    list.appendChild(listItem);
  });
  return list;
}

function displayRecipeDropdown() {
  const container = document.getElementById("recipe-dropdown");
  const select = document.createElement("select");
  select.classList.add("form-select");

  recipes.forEach((recipe, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.innerText = recipe.name;
    select.appendChild(option);
  });

  select.addEventListener("change", (e) => {
    const recipeIndex = e.target.value;
    displayRecipe(recipes[recipeIndex].data);
  });

  container.appendChild(select);
}

function updateIngredientQuantities(recipe, newQuantity) {
  const originalYield = recipe.yield.quantity;
  const ratio = newQuantity / originalYield;

  recipe.ingredients.forEach((ingredient) => {
    ingredient.quantity = ingredient.quantity * ratio;
  });

  return recipe;
}

function clearRecipeContainer() {
  const container = document.getElementById("recipe-container");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function displayRecipe(recipe, newYield=null) {
  clearRecipeContainer();
  
    if (newYield && newYield > 0) {
        recipe = updateIngredientQuantities(recipe, newYield);
        recipe.yield.quantity = newYield;
    }
  
  const container = document.getElementById("recipe-container");

  const title = document.createElement("h1");
  title.classList.add("display-4", "mb-4");
  title.innerText = recipe.title;
  container.appendChild(title);

  const detailsRow = document.createElement("div");
  detailsRow.classList.add("row", "mb-4");
  container.appendChild(detailsRow);
  
  const yieldInfo = document.createElement("p");
  yieldInfo.classList.add("col-sm", "text-center");
  yieldInfo.innerHTML = `<i class="fas fa-chart-pie me-2"></i>Yield: ${recipe.yield.quantity} ${recipe.yield.unit}`;
  //detailsRow.appendChild(yieldInfo);
  
  const yieldWrapper = document.createElement("div");
  yieldWrapper.classList.add("col-sm", "text-center", "d-flex", "align-items-center", "justify-content-center", "align-baseline");
  detailsRow.appendChild(yieldWrapper);

    const decreaseYieldButton = document.createElement("button");
    decreaseYieldButton.classList.add("btn", "btn-outline-secondary", "btn-sm", "me-1", "align-baseline");
    decreaseYieldButton.innerHTML = '<i class="fas fa-minus"></i> Remove serving';
    yieldWrapper.appendChild(decreaseYieldButton);

    yieldWrapper.appendChild(yieldInfo);

    const increaseYieldButton = document.createElement("button");
    increaseYieldButton.classList.add("btn", "btn-outline-secondary", "btn-sm", "ms-1", "align-baseline");
    increaseYieldButton.innerHTML = '<i class="fas fa-plus"></i> Add serving';
    yieldWrapper.appendChild(increaseYieldButton);

  
  

  // Add event listeners for the +/- buttons
  decreaseYieldButton.addEventListener("click", () => {
    const currentYield = parseInt(recipe.yield.quantity, 10);
    if (currentYield > 1) {
      displayRecipe(recipe, currentYield - 1);
    }
  });

  increaseYieldButton.addEventListener("click", () => {
    const currentYield = parseInt(recipe.yield.quantity, 10);
    displayRecipe(recipe, currentYield + 1);
  });

  const prepTime = document.createElement("p");
  prepTime.classList.add("col-sm", "text-center");
  prepTime.innerHTML = `<i class="fas fa-clock me-2"></i>Prep Time: ${recipe.prep_time.quantity} ${recipe.prep_time.unit}`;
  detailsRow.appendChild(prepTime);

  const cookTime = document.createElement("p");
  cookTime.classList.add("col-sm", "text-center");
  cookTime.innerHTML = `<i class="fas fa-hourglass-start me-2"></i>Cook Time: ${recipe.cook_time.quantity} ${recipe.cook_time.unit}`;
  detailsRow.appendChild(cookTime);

  const ingredientsHeader = document.createElement("h2");
  ingredientsHeader.classList.add("mb-3");
  ingredientsHeader.innerHTML = `<i class="fas fa-shopping-basket me-2"></i>Ingredients`;
  container.appendChild(ingredientsHeader);
  
  const ingredientsList = createIngredientsList(recipe.ingredients);
  container.appendChild(ingredientsList);


  const instructionsHeader = document.createElement("h2");
  instructionsHeader.classList.add("mb-3");
  instructionsHeader.innerHTML = `<i class="fas fa-list-ol me-2"></i>Instructions`;
  container.appendChild(instructionsHeader);

  const instructionsList = createInstructionsList(recipe.instructions);
  container.appendChild(instructionsList);
}

displayRecipeDropdown();
displayRecipe(recipes[0].data);
