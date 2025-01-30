import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Recipe } from "../components/Types";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const fetchRecipes = createAsyncThunk('recipes/fetch',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/recipes`);
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.status || e.message);
        }
    }
);

export const addRecipe = createAsyncThunk('recipes/add',
    async (recipe: Recipe, thunkAPI) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/recipes`,
                recipe,
                {
                    headers: {
                        'user-id': recipe.authorId
                    }
                }
            );
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.status || e.message);
        }
    }
);

export const editRecipe = createAsyncThunk('recipes/edit',
    async ({recipe,userId,recipeId}: {recipe:Recipe,userId:number,recipeId:number}, thunkAPI) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/api/recipes/edit`, recipe, {
                headers: {
                    'user-id': userId,
                    'recipe-id': recipeId
                }
            });
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.status || e.message);
        }
    }
);

const recipesSlice = createSlice({
    name: 'recipes',
    initialState: {
        list: [] as Recipe[],
        loading: true
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(fetchRecipes.rejected, () => {
                
            })
            .addCase(addRecipe.fulfilled, (state, action) => {
                state.list.push(action.payload.recipe);
            })
            .addCase(addRecipe.rejected, (_, action) => {
                if (action.payload === 403) {
                    alert("You are not allowed to add a recipe");
                }
            })

            .addCase(editRecipe.fulfilled, (state, action) => {
                console.log(action.payload);
                const index = state.list.findIndex(recipe => recipe.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = action.payload.recipe; 
                }
            })
            .addCase(editRecipe.rejected, (_, action) => {
                if (action.payload === 403) {
                    alert("You are not allowed to edit this recipe");
                }
                else if (action.payload === 404) {
                    alert("Recipe not found");
                }
            });
    }
});

export default recipesSlice;
