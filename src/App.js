/*imports css page, other compenents, routes and route from react router, container
from react-bootstrap, and use state and use effect*/
import './App.css';
import Search from './search.js'
import RecipeBox from './recipeBox.js'
import Homepage from './homepage.js';
import { Routes, Route } from 'react-router-dom';
import TopNavBar from './topNavBar.js';
import { Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';

function App() {
  /*sets state for recipe list fetched from db.json*/
  const [recipeList, setRecipeList] = useState([]);
  /*function that fetches recipe list*/
  const fetchRecipeBox  = async () => {
    const response = await fetch('http://localhost:4000/recipes')
    const data = await response.json()
    setRecipeList(data);
  }
  /*calling function wrapped in use effect*/
  useEffect( () => {
     fetchRecipeBox();
  }, [])

  /*returns nav bar, and container with routes for homepage, search, and recipe box components*/   
  return (
    <div>
      <TopNavBar />
      <Container>
      <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/search" element={<Search />} />
      <Route path="/recipebox" element={<RecipeBox recipeList={recipeList} fetchRecipeBox={fetchRecipeBox }/>} />
      </Routes>
      </Container>
    </div>
  );
}

export default App;
