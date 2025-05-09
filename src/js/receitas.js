/* receitas.js */
const recipeDetails = document.querySelector('.recipe-details');
const id = new URLSearchParams(window.location.search).get('id');

if (id) getRecipeDetails(id);

async function getRecipeDetails(id) {
    const data = await fetchData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const recipe = data?.meals?.[0];
    if (recipe) displayRecipe(recipe);
    else recipeDetails.innerHTML = '<p>Receita não encontrada.</p>';
}

function displayRecipe(recipe) {
    const ingredients = getIngredients(recipe);
    recipeDetails.innerHTML = `
        <h2 >${recipe.strMeal}</h2>
        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
        <h3>Categoria: ${recipe.strCategory}</h3>
        <h3>Origem: ${recipe.strArea}</h3>
        <h3>Ingredientes:</h3>
        <ul>${ingredients}</ul>
        <h3>Instruções:</h3>
        <p>${recipe.strInstructions}</p>
        <p><strong>Tags:</strong> ${recipe.strTags ?? 'Sem tags'}</p>
        <p><a href="${recipe.strYoutube}" target="_blank">Assista no YouTube</a></p>
    `;
}

function getIngredients(recipe) {
    return Array.from({ length: 20 }, (_, i) => {
        const ing = recipe[`strIngredient${i + 1}`];
        const measure = recipe[`strMeasure${i + 1}`];
        return ing ? `<li>${ing} - ${measure}</li>` : '';
    }).join('');
}

async function fetchData(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (err) {
        console.error('Erro ao buscar dados:', err);
        return null;
    }
}


