import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStore } from "../store/store";
import { useEffect, useState } from "react";
import { fetchRecipes } from "../store/recipesSlice";
import { Button, Box, List, ListItem, Typography } from "@mui/material";
import RecipeForm from "./RecipeForm";
import RecipeCard from "./RecipeCard";
import { Recipe } from "./Types"; 

const RecipeList = () => {
    const recipesList = useSelector((store: RootStore) => store.list);
    const dispatch = useDispatch<AppDispatch>();
    const [addRecipe, setAddRecipe] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

    useEffect(() => {
        dispatch(fetchRecipes());
    }, [dispatch]);

    const handleOpen = () => {
        setAddRecipe(true);
    };

    const handleClose = () => {
        setAddRecipe(false);
    };

    const handleTitleClick = (recipe: Recipe) => {
        setSelectedRecipe(recipe);
    };

    return (
        <Box display="flex">
            <Box flex={1} padding={2}>
                <Typography variant="h4">Recipes</Typography>
                <List>
                    {recipesList.map(r => (
                        <ListItem 
                            key={r.id} 
                            onClick={() => handleTitleClick(r)} 
                            component="div" // Specify the component prop
                        >
                            {r.title}
                        </ListItem>
                    ))}
                </List>
                <Button onClick={handleOpen} variant="contained" color="primary">
                    Add Recipe
                </Button>
                <RecipeForm open={addRecipe} close={handleClose} />
            </Box>
            <Box flex={2} padding={2}>
                {selectedRecipe && <RecipeCard recipe={selectedRecipe} />}
            </Box>
        </Box>
    );
};

export default RecipeList;
