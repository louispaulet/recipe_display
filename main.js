const recipes = [
  { name: "Apple Pie", data: applePieRecipe.recipe },
  { name: "Chocolate Chip Cookies", data: newRecipe.recipe },
  { name: "Truffled Bresse chicken", data: truffledBresseChickenRecipe.recipe },
  { name: "Decadent Tiramisu", data: decadentTiramisuRecipe.recipe },
  { name: "Classic roasted ortolan", data: classicRoastedOrtolanRecipe.recipe },
  { name: "Tornedos Rossini", data: tournedosRossiniRecipe.recipe },
  
  { name: "Lobster Thermidor", data: lobsterThermidorRecipe.recipe },
  { name: "Vegan mushroom truffle paté", data: veganMushroomTrufflePate.recipe },
  { name: "Coq au vin", data: coqAuVinRecipe.recipe },
  { name: "Gratin Dauphinois", data: gratinDauphinois.recipe },
  
  { name: "European Apple Pie", data: europeanApplePieRecipe.recipe }
];

function getRecipeFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const recipeParam = urlParams.get('recipe');
  if (recipeParam) {
    const recipeIndex = recipes.findIndex(recipe => recipe.name.toLowerCase() === recipeParam.toLowerCase());
    if (recipeIndex !== -1) {
      return recipeIndex;
    }
  }
  return 0; // Default recipe index if not found in the URL
}

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

function displayRecipeDropdown(initialRecipeIndex) {
  const container = document.getElementById("recipe-dropdown");
  const select = document.createElement("select");
  select.classList.add("form-select");

  recipes.forEach((recipe, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.innerText = recipe.name;
    if (index === initialRecipeIndex) {
      option.selected = true;
    }
    select.appendChild(option);
  });

  select.addEventListener("change", (e) => {
    const recipeIndex = e.target.value;
    displayRecipe(recipes[recipeIndex].data);
    window.history.pushState({}, '', `?recipe=${encodeURIComponent(recipes[recipeIndex].name)}`);
  });

  container.appendChild(select);
}


function copyUrlToClipboard(shareButton) {
  const el = document.createElement('textarea');
  el.value = window.location.href;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);

  // Update the share button style and text
  shareButton.classList.add('btn-outline-success');
  shareButton.innerHTML = '<i class="fas fa-check"></i> Link copied';

  // Reset the button style and text after 5 seconds
  setTimeout(() => {
    shareButton.classList.remove('btn-success');
    shareButton.innerHTML = '<i class="fas fa-share"></i> Share this recipe!';
  }, 1000);
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

function createNotesSection(notes) {
  const container = document.createElement("div");
  const header = document.createElement("h2");
  header.classList.add("mb-3");
  header.innerHTML = `<i class="fas fa-lightbulb me-2"></i>Notes`;
  container.appendChild(header);

  const list = document.createElement("ul");
  list.classList.add("list-unstyled");
  notes.forEach(note => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<i class="fas fa-info-circle me-2"></i>${note}`;
    list.appendChild(listItem);
  });
  container.appendChild(list);

  return container;
}

// Add this new function to create the tags section
function createTagsSection(tags) {
  const container = document.createElement("div");
  const header = document.createElement("h2");
  header.classList.add("mb-3");
  header.innerHTML = `<i class="fas fa-tags me-2"></i>Tags`;
  container.appendChild(header);

  const list = document.createElement("ul");
  list.classList.add("list-inline");
  tags.forEach(tag => {
    const listItem = document.createElement("li");
    listItem.classList.add("list-inline-item", "me-3");
    listItem.innerHTML = `<span class="badge bg-secondary">${tag}</span>`;
    list.appendChild(listItem);
  });
  container.appendChild(list);

  return container;
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
  
    const shareButtonWrapper = document.createElement("div");
    shareButtonWrapper.classList.add("col-sm", "text-center", "d-flex", "align-items-center", "justify-content-center", "align-baseline");
    detailsRow.appendChild(shareButtonWrapper);

    const shareButton = document.createElement("button");
    shareButton.classList.add("btn", "btn-outline-secondary", "btn-sm");
    shareButton.innerHTML = '<i class="fas fa-share"></i> Share this recipe!';
    shareButtonWrapper.appendChild(shareButton);

    shareButton.addEventListener("click", () => {
      copyUrlToClipboard(shareButton);
    });

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
  
  // Add the new notes and tags sections if they exist
  if (recipe.notes && recipe.notes.length > 0) {
    const notesSection = createNotesSection(recipe.notes);
    container.appendChild(notesSection);
  }

  if (recipe.tags && recipe.tags.length > 0) {
    const tagsSection = createTagsSection(recipe.tags);
    container.appendChild(tagsSection);
  }
}

const initialRecipeIndex = getRecipeFromUrl();
displayRecipeDropdown(initialRecipeIndex);
displayRecipe(recipes[initialRecipeIndex].data);