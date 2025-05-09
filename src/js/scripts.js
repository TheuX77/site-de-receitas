/* scripts.js */
const form = document.querySelector('.search-form');
const recipeList = document.querySelector('.recipe-list');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const ingredient = event.target.querySelector('input').value.trim();
    if (ingredient) await searchRecipes(ingredient);
});

async function fetchData(url) {
    try {
        const res = await fetch(url);
        return await res.json();
    } catch (err) {
        console.error('Erro:', err);
        return null;
    }
}

async function searchRecipes(ingredient) {
    recipeList.innerHTML = `<p>Carregando receitas...</p>`;
    const data = await fetchData(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    if (data?.meals) showRecipes(data.meals);
    else recipeList.innerHTML = `<p>Nenhuma receita encontrada.</p>`;
}

function showRecipes(recipes) {
    recipeList.innerHTML = recipes.map(item => `
        <div class="recipe-card" onclick="openRecipe(${item.idMeal})">
            <img src="${item.strMealThumb}" alt="${item.strMeal}">
            <h3>${item.strMeal}</h3>
        </div>
    `).join('');
}

function openRecipe(id) {
    window.open(`receitas.html?id=${id}`, '_blank');
}

window.onload = async () => {
    const promises = Array.from({ length: 12 }, () => fetchData('https://www.themealdb.com/api/json/v1/1/random.php'));
    const results = await Promise.all(promises);
    const meals = results.map(r => r?.meals?.[0]).filter(Boolean);
    showRecipes(meals);
};
