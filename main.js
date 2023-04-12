const recipes = [
  { name: "Apple Pie", data: applePieRecipe.recipe },
  { name: "Chocolate Chip Cookies", data: newRecipe.recipe }
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

function clearRecipeContainer() {
  const container = document.getElementById("recipe-container");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function displayRecipe(recipe) {
  clearRecipeContainer();
  
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
  detailsRow.appendChild(yieldInfo);

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
