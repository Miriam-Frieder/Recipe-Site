import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStore } from "../store/store";
import { useEffect, useState } from "react";
import { fetchRecipes } from "../store/recipesSlice";
import { Button } from "@mui/material";
import { Recipe } from "./Types";
import RecipeForm from "./RecipeForm";

const RecipeList = () => {
    const recipesList = useSelector((store: RootStore) => store.list);
    const dispatch = useDispatch<AppDispatch>();
    const [open, setOpen] = useState(false); // State to manage modal open/close

    useEffect(() => {
        dispatch(fetchRecipes());
    }, [dispatch]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {recipesList.map(r => <p key={r.id}>{r.title}</p>)}
            <Button onClick={handleOpen} variant="contained" color="primary">
                Add Recipe
            </Button>
            <RecipeForm open={open} close={handleClose} />
        </>
    );
};

export default RecipeList;
