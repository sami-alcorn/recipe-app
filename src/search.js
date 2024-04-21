/*imports use effect, use state, and get recipe info compoenent*/
import React, { useEffect, useState } from 'react';
import GetRecipeInfo from './getRecipeInfo'

/*function to fetch data from spoonacular API with search input*/
export default function Search() {
  /*sets state for the search value of the input, the search results*/
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  
  console.log(searchResults)
  /*created variable for spoonacular API url/endpoint*/
  const url = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=b2739da791b9440fb7846e5efb200b54&query='

  useEffect(() => {
    const fetchData = async () => {
      if(searchValue.trim() === '') {
        setSearchResults([]);
        return;
      }
      /*if the search value is not an empty string, the fetch request is sent, concatenating
      the URL with the search value*/
      try {
        const response = await fetch(url + searchValue);
        const data = await response.json();
        setSearchResults(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    /*calling fetch data function with the search value for the dependancy array*/
    fetchData();
  }, [searchValue]);
  /*returns header and input amd maps out the search resutls a div. the results are
  displayed with the get recipe info component*/
  return (
    <div id="search-div">
      <div id="search-form">
      <h2>Find your new favorite recipes!</h2>
      <input
        id="search-input"
        className='form-control'
        value={searchValue}
        type='search'
        onChange={(e) => setSearchValue(e.target.value)}
      />
      </div>
      <div id="search-results-div">
        {searchResults.map(recipe => (
            <GetRecipeInfo key={recipe.id} id={recipe.id} title={recipe.title} />
        ))}
      </div>
    </div>
  );
}












      