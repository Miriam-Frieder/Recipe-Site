import { FormEvent, useContext, useState } from "react";
import { User } from "./Types";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import UserContext from "./UserContext";
import { emptyUser } from "./UserContext";
import { loginBoxStyle } from "./Styles";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const Login = ({ open,isRegister, close }: { open: boolean,isRegister:boolean, close: Function }) => {
  const { userDispatch } = useContext(UserContext);
  const [userData, setUserData] = useState<User>(emptyUser);
  const uri=isRegister?'api/user/register':'api/user/login'

  const handleChange = (key: string, value: string) => {
    setUserData({ ...userData, [key]: value });
  };

   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      try {
        const response = await fetch(`${API_BASE_URL}/${uri}`, {
          method: 'POST',
          body: JSON.stringify(
            {
              email: userData.email,
              password: userData.password
            }
          ),
          headers: {
            'content-type': 'application/json',
          }
        })
        if (response.status === 422) { alert('user already sign up') }
        else if (response.status ===401) { alert('user not found') }
        else if (!response.ok) { throw new Error(response.status + '') }

        const data = await response.json()

        userDispatch({
          type: 'CREATE_USER',
          data: isRegister?{ ...userData, id: data.userId }:data.user,
        });
  
        setUserData(emptyUser);
        close();
      }
      catch (e) {
        console.log(e);
        alert('Something went wrong. Please try again later.');
      }
    };

  return (
    <Modal
      open={open}
      onClose={() => close()}
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={loginBoxStyle}
      >
        <Typography variant="h6" component="h1" textAlign="center" id="login-modal-title">
          {isRegister? 'Sign Up' : 'Login'}
        </Typography>

        <TextField
          id="email"
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          value={userData.email}
          onChange={(e) => handleChange(e.target.id, e.target.value)}
        />

        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={userData.password}
          onChange={(e) => handleChange(e.target.id, e.target.value)}
        />

        <Button type="submit" variant="contained" fullWidth>
          Continue
        </Button>
      </Box>
    </Modal>
  );
};

export default Login;
