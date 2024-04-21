/*imports use state*/
import React, { useState } from 'react';
/*get recipe info function, takes recipe's id and title as parameters*/
export default function GetRecipeInfo({ id, title }) {
  /*set recipe info set to null and show recipe info to false, 
  info is only shown when title is clicked on.
  variable for recipe info url, using template literal for id of specific recipe and my api key*/
  const [recipeInfo, setRecipeInfo] = useState(null);
  const [showRecipeInfo, setShowRecipeInfo] = useState(false);
  const apiKey = 'b2739da791b9440fb7846e5efb200b54';
  const recipeUrl = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${apiKey}`;

 /*funtion that fetches details about recipe from spoonacular*/
  const fetchRecipeInfo = async () => {
    try {
      const response = await fetch(recipeUrl);
      const data = await response.json();
      setRecipeInfo(data);
      /*toggles whether detailed info is shown if recipe title is clicked*/
      setShowRecipeInfo(!showRecipeInfo);
    } catch (error) {
      console.error('Error fetching recipe information:', error);
    }
  };
  /*function to add recipe to recipe box that is called when add button is clicked.
  uses data from spoonacular to display accurate info on page and posts to json server*/
  const handleAddToRecipeList = async () => {
    if (recipeInfo) {
      const response = await fetch('http://localhost:4000/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: recipeInfo.id,
          title: recipeInfo.title,
          sourceUrl: recipeInfo.sourceUrl,
        }),
      });
      /*once add recipe button is clicked, details are no longer displayed*/
      setShowRecipeInfo(false)
    }
  }    
  /*function for toggling show recipe info. if show recipe info is true, when title is clicked again
  it is set to false*/
  const toggleRecipeInfo = () => {
    setShowRecipeInfo(!showRecipeInfo); 
  };
  /*when recipe title is clicked, returns a card with recipe details pulled from spoonacular
  shows image, number of servings, prep time, WW points, and website name as link that takes you
  to the url for the specific recipe. Also shows option to add to recipe box*/
  return (
    <div>
      <h2 onClick={showRecipeInfo ? toggleRecipeInfo : fetchRecipeInfo}>{title}</h2>
      {showRecipeInfo && recipeInfo && (
        <div className='card' id="results-info-card">
          <img id="results-image" src={recipeInfo.image} width={200} height={200} alt={recipeInfo.title} />
          <p>
          Servings: {recipeInfo.servings}<br></br>
          Ready in {recipeInfo.readyInMinutes} minutes<br></br>
          WW Smart Points: {recipeInfo.weightWatcherSmartPoints}<br></br> 
          Get full recipe at:&nbsp;
          <a href={recipeInfo.sourceUrl} target="_blank" rel="noopener noreferrer">{recipeInfo.sourceName}</a>
          <br/><button id="add-recipe-button" className='btn btn-dark' onClick={handleAddToRecipeList}>Save to Recipe Box</button>
          </p>
        </div>
      )}
    </div>
  );
}
