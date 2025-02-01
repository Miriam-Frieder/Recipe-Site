import { useContext, useState } from "react";
import { Recipe } from "./Types";
import { Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, Typography, List, ListItem, ListItemIcon } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import img from '../img/recipe.jpg'
import EditIcon from '@mui/icons-material/Edit';
import RecipeForm from "./RecipeForm";
import UserContext from "./UserContext";


const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
    const [expanded, setExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const { user } = useContext(UserContext);
    

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleEditClick = () => {
        setIsEditing(true)
    };

    return (
        <>
        <Card sx={{ maxWidth: 345, margin: 2 }}>

            <CardHeader
                title={recipe.title}
                action={
                    <IconButton onClick={handleEditClick} aria-label="edit" disabled={!user.id}>
                        <EditIcon />
                    </IconButton>
                } />

            <CardMedia
                component="img"
                height="194"
                image={recipe.image ?? img}
                alt={recipe.title}
            />

            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {recipe.description}
                </Typography>
            </CardContent>

            <CardActions disableSpacing>

                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>

                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>

                <IconButton onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
                    <ExpandMoreIcon />
                </IconButton>

            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>

                <CardContent>

                    <Typography variant="h6">Ingredients</Typography>
                    <List>
                        {recipe.ingredients.map((ingredient, index) => (
                            <ListItem key={index}>
                                <ListItemIcon>
                                    <CheckIcon />
                                </ListItemIcon>
                                <Typography>{ingredient}</Typography>
                            </ListItem>
                        ))}
                    </List>

                    <Typography variant="h6">Instructions</Typography>
                    <Typography>
                        {recipe.instructions}
                    </Typography>

                </CardContent>

            </Collapse>
        </Card>

        <RecipeForm open={isEditing} close={()=>setIsEditing(false)} recipe={recipe}/>
        </>
    );
}

export default RecipeCard;
