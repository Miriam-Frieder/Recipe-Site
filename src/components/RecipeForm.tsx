import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography, Modal } from '@mui/material';
import { Recipe } from './Types';
import { addRecipe } from '../store/recipesSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { useContext } from 'react';
import UserContext from './UserContext';
import SendIcon from '@mui/icons-material/Send';

const RecipeForm = ({ open, close }: { open: boolean; close: Function }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useContext(UserContext);
    const formik = useFormik({
        initialValues: { title: '', description: '', ingredients: [''], instructions: '' },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required'),
            ingredients: Yup.array().of(Yup.string().required('Product name is required')).min(1, 'At least one product is required'),
            instructions: Yup.string().required('Instructions are required'),
        }),
        onSubmit: (values) => {
            const newRecipe: Recipe = {
                title: values.title, ingredients: values.ingredients, description: values.description,
                instructions: values.instructions, authorId: user.id ?? 0,
            };
            dispatch(addRecipe(newRecipe));
            formik.resetForm();
            close();
        }
    });

    const handleAddProduct = () => formik.setFieldValue('ingredients', [...formik.values.ingredients, '']);
    const handleProductChange = (index: number, value: string) => {
        const products = [...formik.values.ingredients];
        products[index] = value;
        formik.setFieldValue('ingredients', products);
    };

    return (
        <Modal open={open} onClose={() => close()} aria-labelledby="update-modal-title" aria-describedby="update-modal-description">
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24, p: 4, maxWidth: 400, mx: 'auto' }}>
                
                <Typography variant="h4">Add Recipe</Typography>
                
                <TextField fullWidth id="title" name="title" label="Title" value={formik.values.title} onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)} helperText={formik.touched.title && formik.errors.title} sx={{ mb: 2 }} />
                
                <TextField fullWidth id="description" name="description" label="Description" multiline rows={4} value={formik.values.description}
                    onChange={formik.handleChange} error={formik.touched.description && Boolean(formik.errors.description)} helperText={formik.touched.description && formik.errors.description} sx={{ mb: 2 }} />
                
                <Typography variant="h6">Products</Typography>
                {formik.values.ingredients.map((ingredient, index) => (
                    <TextField key={index} fullWidth id={`ingredients.${index}`} name={`ingredients.${index}`} label={`Ingredient ${index + 1}`} value={ingredient}
                        onChange={(e) => handleProductChange(index, e.target.value)} error={formik.touched.ingredients && Boolean(formik.errors.ingredients?.[index])}
                        helperText={formik.touched.ingredients && formik.errors.ingredients?.[index]} sx={{ mb: 2 }} />
                ))}
                
                <Button onClick={handleAddProduct} variant="outlined" color="primary" sx={{ mb: 2 }}>Add Product</Button>
                
                <TextField fullWidth id="instructions" name="instructions" label="Instructions" multiline rows={4} value={formik.values.instructions}
                    onChange={formik.handleChange} error={formik.touched.instructions && Boolean(formik.errors.instructions)} helperText={formik.touched.instructions && formik.errors.instructions} sx={{ mb: 2 }} />
                
                <Button color="primary" variant="contained" fullWidth type="submit" startIcon={<SendIcon />}>Send Recipe</Button>
            </Box>
        </Modal>
    );
};

export default RecipeForm;
