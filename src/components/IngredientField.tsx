import { Box, Button, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { FormikProps } from "formik";
import {   RecipeFormType } from "./Types";


const IngredientField = ({ index, formik }:{index:number,formik:FormikProps<RecipeFormType>}) => {
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const products = [...formik.values.ingredients];
        products[index] = value;
        formik.setFieldValue('ingredients', products);
    };

    const handleDelete = () => {
        if (formik.values.ingredients.length <= 1) {
            formik.setFieldError('ingredients', 'You must have at least one ingredient.');
        } else {
            const products = [...formik.values.ingredients];
            products.splice(index, 1);
            formik.setFieldValue('ingredients', products);
            formik.setFieldError('ingredients', '');
        }
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TextField
                fullWidth
                id={`ingredients.${index}`}
                name={`ingredients.${index}`}
                label={`Ingredient ${index + 1}`}
                value={formik.values.ingredients[index]}
                onChange={handleChange}
                error={formik.touched.ingredients && Boolean(formik.errors.ingredients?.[index])}
                helperText={formik.touched.ingredients && formik.errors.ingredients}
            />
            <Button onClick={handleDelete} color="secondary" sx={{ ml: 1 }}>
                <DeleteIcon />
            </Button>
        </Box>
    );
};

export default IngredientField;