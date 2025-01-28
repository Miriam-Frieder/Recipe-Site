import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Recipe } from "../components/Types";
import axios from "axios";
import { useContext } from "react";


export const fetchRecipes = createAsyncThunk('recipes/fetch',
    async (_, thunkAPI) => {
        try {
            console.log('in async thunk');
            const response = await axios.get('http://localhost:3000/api/recipes')
            return response.data
        }
        catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const addRecipe = createAsyncThunk('recipes/add',
    async (recipe: Recipe, thunkAPI) => {
        try {
            console.log('in async thunk');
            const response = await axios.post('http://localhost:3000/api/recipes',
                {
                    title: recipe.title,
                    description: "new recipe with id " + recipe.id
                },
                {
                    headers: {
                        'user-id': 1738080270829
                    }
                }
            )
            return response.data
        }
        catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

const recipesSlice = createSlice({
    name: 'recipes',
    initialState: {
        list: [] as Recipe[],
        loading: true
    },
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.fulfilled,
                (state, action) => {
                    console.log('fulfilled');
                    state.list = action.payload
                })
            .addCase(fetchRecipes.rejected,
                () => {
                    console.log('failed');
                }
            )
            .addCase(addRecipe.fulfilled,
                (state, action) => {
                    console.log('add: fulfilled');
                    //state.list.push(action.payload.recipe);
                    state.list = [...state.list, action.payload.recipe]
                })
            .addCase(addRecipe.rejected,
                () => {
                    console.log('add: failed');
                }
            )
    }
   
});

export default recipesSlice;