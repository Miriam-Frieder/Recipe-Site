import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStore } from "../store/store";
import { useContext, useEffect, useState } from "react";
import { fetchRecipes } from "../store/recipesSlice";
import { Button, Box, List, Typography, ListItemButton, CircularProgress } from "@mui/material";
import RecipeForm from "./RecipeForm";
import RecipeCard from "./RecipeCard";
import { Recipe } from "./Types";
import UserContext from "./UserContext";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';


const RecipeList = () => {
    const recipesList = useSelector((store: RootStore) => store.list);
    const isLoading = useSelector((store: RootStore) => store.loading);
    const dispatch = useDispatch<AppDispatch>();
    const [addRecipe, setAddRecipe] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const { user } = useContext(UserContext);

    useEffect(() => {
        dispatch(fetchRecipes());
    }, [dispatch]);

    const handleOpenAdd = () => {
        setAddRecipe(true);
    };

    const handleCloseAdd = () => {
        setAddRecipe(false);
    };

    const handleTitleClick = (recipe: Recipe) => {
        setSelectedRecipe(recipe);
    };

    return (
        <>
            {isLoading&&<CircularProgress />}
            <Box display="flex">
                <Box flex={1} padding={2}>
                    <Typography variant="h4">Recipes</Typography>
                    <List>
                        {recipesList.map(r => (
                            <ListItemButton
                                key={r.id}
                                onClick={() => handleTitleClick(r)}
                                component="a"
                            >
                                <ReceiptLongIcon sx={{ margin: 0.5 }} />
                                {r.title} 
                            </ListItemButton>
                        ))}
                    </List>
                    <Button onClick={handleOpenAdd} variant="contained" color="primary" disabled={!user.id}>
                        Add Recipe
                    </Button>
                    <RecipeForm open={addRecipe} close={handleCloseAdd} />
                </Box>
                <Box flex={2} padding={2}>
                    {selectedRecipe && <RecipeCard recipe={selectedRecipe} />}
                </Box>
            </Box>
        </>
    );
};

export default RecipeList;
