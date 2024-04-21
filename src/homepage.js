/*imports container from react booststrap and image displayed on homepage*/
import { Container } from "react-bootstrap"
import rainbowfood from "./rainbowfood.png"
/*returns header, paragraph, and image for homepage*/
export default function Homepage() {
    return (
     <div>
        <Container id="home-container">
            <h1>Welcome to Rad Recipes!</h1>
            <p id="home-paragraph">
            Rad Recipes is your ultimate destination for discovering and curating your new go-to dishes.
            Whether you're looking for scrumptious snacks, enticing entrées, delectable desserts, or delicious 
            drinks, we've got you covered! With an endless array of options to explore, there's something to 
            satisfy every craving. Dive into our search page and unlock instant access to thousands of recipes. 
            You're sure to find what suits your mood, budget, and lifestyle. Intrigued by a dish? Follow the 
            link to uncover the full recipe, complete with detailed instructions. Utilize our Recipe Box 
            feature for effortless organization, saving your favorite finds for future reference.
            Plus, customize your culinary journey by adding notes, whether it's ingredient swaps, 
            cooking tips, or personal anecdotes. Get ready to elevate your cooking experience with Rad Recipes!
            </p>
        </Container>
     <div id="home-image-div">
         <img className="image" id="home-image" src={rainbowfood} width={1025} height={400}/>
     </div>
    </div>
   )
}