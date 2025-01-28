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
        initialValues: {
            title: '',
            description: '',
            ingredients: [''],
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required'),
            ingredients: Yup.array()
                .of(Yup.string().required('Product name is required'))
                .min(1, 'At least one product is required'),
        }),
        onSubmit: (values) => {
            const newRecipe: Recipe = {
                title: values.title,
                ingredients: values.ingredients,
                description: values.description,
                userId: user.id,
            }
            dispatch(addRecipe(newRecipe));
            close();
        }
    });

    const handleAddProduct = () => {
        formik.setFieldValue('products', [...formik.values.ingredients, '']);
    };

    const handleProductChange = (index: number, value: string) => {
        const products = [...formik.values.ingredients];
        products[index] = value;
        formik.setFieldValue('products', products);
    };

    return (
        <Modal
            open={open}
            onClose={() => close()}
            aria-labelledby="update-modal-title"
            aria-describedby="update-modal-description"
        >
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
                <Typography variant="h4">Add Recipe</Typography>
                <TextField
                    fullWidth
                    id="title"
                    name="title"
                    label="Title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    id="description"
                    name="description"
                    label="Description"
                    multiline
                    rows={4}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                    sx={{ mb: 2 }}
                />
                <Typography variant="h6">Products</Typography>
                {formik.values.ingredients.map((product, index) => (
                    <TextField
                        key={index}
                        fullWidth
                        id={`products.${index}`}
                        name={`products.${index}`}
                        label={`Product ${index + 1}`}
                        value={product}
                        onChange={(e) => handleProductChange(index, e.target.value)}
                        error={formik.touched.ingredients && Boolean(formik.errors.ingredients?.[index])}
                        helperText={formik.touched.ingredients && formik.errors.ingredients?.[index]}
                        sx={{ mb: 2 }}
                    />
                ))}
                <Button onClick={handleAddProduct} variant="outlined" color="primary" sx={{ mb: 2 }}>
                    Add Product
                </Button>
                <Button color="primary" variant="contained" fullWidth type="submit" startIcon={<SendIcon />}>
                    Send Recipe
                </Button>
            </Box>
        </Modal>
    );
};

export default RecipeForm;
