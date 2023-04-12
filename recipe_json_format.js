const rawJsonElement = document.getElementById("raw-json");
const codeElement = rawJsonElement.getElementsByTagName("code")[0];
codeElement.textContent = JSON.stringify(europeanApplePieRecipe, null, 2);

