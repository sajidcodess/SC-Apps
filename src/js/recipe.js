//selectors
const recipeForm = document.querySelector(".recipe_form");
const recipeInput = document.querySelector(".recipe_input");
const recipeWrapper = document.querySelector(".recipe_grid");

const App_ID = "2a23a5be";
const App_Key = "a83d4bf12be8eba5f78cf153910733d1";
let APP_URL = `https://api.edamam.com/search?q=chicken&app_id=${App_ID}&app_key=${App_Key}&from=0&to=3&calories=591-722&health=alcohol-free`;

const fetchRecipies = async (query) => {
    query = query || "cake";
    APP_URL = `https://api.edamam.com/search?q=${query}&app_id=${App_ID}&app_key=${App_Key}&from=0&to=3&calories=591-722&health=alcohol-free`;
    try {
        let response = await fetch(APP_URL);
        let data = await response.json();
        let recipes = data.hits;
        console.log(recipes);
        return recipes;
    } catch (error) {
        console.log("error");
    }
};

recipeInput.addEventListener("keypress", () => {
    renderRecipe();
});

recipeForm.addEventListener("submit", (e) => {
    e.preventDefault();
});

const renderRecipe = async () => {
    const recipeData = await fetchRecipies(recipeInput.value);

    let html = "";

    recipeData.forEach((recipe) => {
        const { image, label, ingredientLines } = recipe.recipe;
        console.log(label);
        let ingredientsList = "";
        ingredientLines.forEach((line) => {
            ingredientsList += `<li>${line}</li>`;
        });

        html += `
        <div class="recipe_flex">
    <img src=${image} alt="image">
    <div class="recipe_info">
    <h3>${label}</h3>
    <ol>${ingredientsList}</ol>
    </div>
        </div>
    `;
    });

    recipeWrapper.innerHTML = html;
};

window.onload = renderRecipe();
