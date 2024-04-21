/*imports use state, use effect, and react-bootstrap components*/
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody } from 'react-bootstrap';
/*function to fetch recipes that have been added to db.json*/
export default function RecipeBox({ recipeList, fetchRecipeBox }) {
  useEffect(() => {
    fetchRecipeBox();
  }, []);
  /*function to delete recipe from recipe box*/
  const deleteRecipe = async (id) => {
    await fetch(`http://localhost:4000/recipes/${id}`, {
      method: "DELETE"
    })
    /*calls fetch recipe box function again to dispay update list on page*/
    fetchRecipeBox()
  }
  /*sets state for user notes, as an empty object*/
  const [userNotesMap, setUserNotesMap] = useState({});
  /*get request for existing recipe data*/
  const addUserNotes = async (id) => {
    const response = await fetch(`http://localhost:4000/recipes/${id}`, {
      method: 'GET', 
    });
    const recipe = await response.json();
    
    /*Concatenates new notes with the existing notes, separated by a line break*/
    const updatedNotes = (recipe.notes ? recipe.notes + '\n' : '') + userNotesMap[id];
    
    /*updated recipe object with newly added notes*/
    recipe.notes = updatedNotes;
    
    /*sends PUT request to update the entire recipe with updated notes field*/
    await fetch(`http://localhost:4000/recipes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe),
    });
    
    /*updates the state so they new notes are displayed on the page*/
    setUserNotesMap(prevNotes => ({
      ...prevNotes,
      [id]: updatedNotes
    }));
  
    /*clears the input value after notes are added by setting input value to empty string*/
    setUserNotesMap(prevNotes => ({
      ...prevNotes,
      [id]: ''
    }));
    /*calls fetch recipe box again to make sure up to date information is rendered*/
    fetchRecipeBox()
  };
  /*returns header and maps recipe list in a card for each recipe. each card has a header 
  with the recipe tite and a body with the recipe's url, any notes that have been added 
  (displayed as an unordered list), the input to add notes, and the buttons to save
  notes or delete recipe from the recipe box*/
  return (
    <div id="recipe-box">
      <h3>Recipe Box</h3>
      {recipeList.map(recipe => (
        <Card id="recipe-card" key={recipe.id}>
          <CardHeader><h5>{recipe.title}</h5></CardHeader>
          <CardBody>
            <div>
              <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">{recipe.sourceUrl}</a>
              <br/><br></br>
              <ul>
                {recipe.notes && recipe.notes.split('\n').map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>
            <div>
              <input
                type="text"
                className='form-control'
                value={userNotesMap[recipe.id] || ''} 
                onChange={(e) => setUserNotesMap(prevNotes => ({
                  ...prevNotes,
                  [recipe.id]: e.target.value 
                }))}
                placeholder="Add notes..."
              />
              <button id="save-button" className='btn btn-sm btn-dark' onClick={() => addUserNotes(recipe.id)}>Save Notes</button>
              <button id="delete-button" className='btn btn-sm' onClick={() => deleteRecipe(recipe.id)}>Delete Recipe</button>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}
  


