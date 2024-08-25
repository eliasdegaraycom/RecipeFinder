import React, { useState } from 'react';

const RecipeApp = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const apiUrl = `https://api.edamam.com/search?q=${query}&app_id=YOUR_APP_ID&app_key=YOUR_APP_KEY`;

  const searchRecipes = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setRecipes(data.hits);
      setSelectedRecipe(null);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query) {
      searchRecipes();
    }
  };

  return (
    <div className="recipe-app">
      <h1>Recipe Finder</h1>
      <SearchBar query={query} onChange={handleInputChange} onSearch={handleSearch} />
      <RecipeList recipes={recipes} onSelectRecipe={setSelectedRecipe} />
      {selectedRecipe && <RecipeDetail recipe={selectedRecipe} />}
    </div>
  );
};

const SearchBar = ({ query, onChange, onSearch }) => (
  <div className="search-bar">
    <input
      type="text"
      value={query}
      onChange={onChange}
      placeholder="Search for recipes..."
    />
    <button onClick={onSearch}>Search</button>
  </div>
);

const RecipeList = ({ recipes, onSelectRecipe }) => (
  <div className="recipe-list">
    {recipes?.map((item, index) => (
      <div key={index} className="recipe-item" onClick={() => onSelectRecipe(item.recipe)}>
        <img src={item.recipe.image} alt={item.recipe.label} />
        <h2>{item.recipe.label}</h2>
      </div>
    ))}
  </div>
);

const RecipeDetail = ({ recipe }) => (
  <div className="recipe-detail">
    <h2>{recipe.label}</h2>
    <img src={recipe.image} alt={recipe.label} />
    <p><strong>Ingredients:</strong></p>
    <ul>
      {recipe.ingredientLines.map((ingredient, index) => (
        <li key={index}>{ingredient}</li>
      ))}
    </ul>
    <p><strong>Instructions:</strong></p>
    <a href={recipe.url} target="_blank" rel="noopener noreferrer">View full recipe</a>
  </div>
);

export default RecipeApp;

