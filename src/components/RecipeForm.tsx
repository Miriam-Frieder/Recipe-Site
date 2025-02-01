import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography, Modal } from '@mui/material';
import { Recipe, RecipeFormType } from './Types';
import { addRecipe, editRecipe } from '../store/recipesSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { useContext, useEffect } from 'react';
import UserContext from './UserContext';
import SendIcon from '@mui/icons-material/Send';
import { boxStyle, recipeFormInputProps } from './Styles';
import IngredientField from './IngredientField';

const RecipeForm = ({ open, close, recipe }: { open: boolean; close: Function, recipe?: Recipe }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useContext(UserContext);

    const formik = useFormik<RecipeFormType>({
        initialValues: {
            title: recipe?.title || '',
            description: recipe?.description || '',
            ingredients: recipe?.ingredients || [''],
            instructions: recipe?.instructions || ''
        } as Recipe,
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required'),
            ingredients: Yup.array().of(Yup.string().required('Product name is required')).min(1, 'At least one product is required'),
            instructions: Yup.string().required('Instructions are required'),
        }),
        onSubmit: (values) => {
            const newRecipe: Recipe = {
                title: values.title,
                ingredients: values.ingredients,
                description: values.description,
                instructions: values.instructions,
                authorId: user.id ?? 0,
            };
            recipe ? dispatch(editRecipe({ recipe: newRecipe, userId: user.id ?? 0, recipeId: recipe.id ?? 0 })) : dispatch(addRecipe(newRecipe));
            formik.resetForm();
            close();
        }
    });

    useEffect(() => {
        if (recipe) {
            formik.setValues({
                title: recipe.title,
                description: recipe.description,
                ingredients: recipe.ingredients,
                instructions: recipe.instructions,
            })
        }
    }, [recipe]);

    const handleClose = () => {
        formik.resetForm();
        close();
    };

    const handleAddProduct = () => formik.setFieldValue('ingredients', [...formik.values.ingredients, '']);

    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="update-modal-title" aria-describedby="update-modal-description">
            <Box component="form" onSubmit={formik.handleSubmit} sx={boxStyle}>

                <Typography variant="h4">Your Recipe</Typography>

                <TextField {...recipeFormInputProps('title', formik)} />

                <TextField {...recipeFormInputProps('description', formik)} />

                <Typography variant="h6">Ingredients</Typography>
                {formik.values.ingredients.map((_, index) => (
                    <IngredientField key={index} index={index} formik={formik} />
                ))}

                <Button onClick={handleAddProduct} variant="outlined" color="primary" sx={{ mb: 2 }}>Add Ingredient</Button>

                <TextField {...recipeFormInputProps('instructions', formik)} />

                <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                    startIcon={<SendIcon />}
                >Send Recipe
                </Button>
            </Box>
        </Modal>
    );
};
export default RecipeForm;
