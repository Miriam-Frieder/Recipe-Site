import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useContext, useState } from "react";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import UserAvatar from "./UserAvatar";
import Login from "./UserLogin";
import { UserContext } from "./UserContext";
import { Link as RouterLink } from "react-router-dom";
import Link from '@mui/material/Link';

const Navbar = () => {
    const [isLogging, setIsLogging] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const { user } = useContext(UserContext);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    {user?.id ? (
                        <UserAvatar />
                    ) : (
                        <Box>
                            <Button
                                variant="contained"
                                startIcon={<PersonAddIcon />}
                                onClick={() => setIsRegister(true)}
                            >
                                Sign Up
                            </Button>
                            <Login
                                open={isLogging}
                                isRegister={isRegister}
                                close={() => setIsLogging(false)}
                            />
                            <Button
                                variant="contained"
                                startIcon={<LoginIcon />}
                                onClick={() => setIsLogging(true)}
                            >
                                Log in
                            </Button>
                            <Login
                                open={isRegister}
                                isRegister={isRegister}
                                close={() => setIsRegister(false)}
                            />
                        </Box>
                    )}
                    <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Link
                            underline="none"
                            color="inherit"
                            component={RouterLink}
                            to="/"
                        >
                            Home
                        </Link>
                        <Typography variant="body2" color="inherit">|</Typography>
                        <Link
                            underline="none"
                            color="inherit"
                            component={RouterLink}
                            to="/about"
                        >
                            About
                        </Link>
                        <Typography variant="body2" color="inherit">|</Typography>
                        <Link
                            underline="none"
                            color="inherit"
                            component={RouterLink}
                            to="/recipes"
                        >
                            Recipes
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;
