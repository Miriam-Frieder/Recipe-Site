import { FormEvent, useContext, useEffect, useState } from "react";
import { User } from "./Types";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import UserContext from "./UserContext";
import SaveIcon from "@mui/icons-material/Save";
import { loginBoxStyle } from "./Styles";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const Update = ({ open, close }: { open: boolean; close: Function }) => {
  const { user, userDispatch } = useContext(UserContext);
  const [userData, setUserData] = useState<User>(user);
  useEffect(() => { setUserData(user); }, [user]);

  const handleChange = (key: string, value: string) => setUserData({ ...userData, [key]: value });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/user`, {
        method: 'PUT',
        body: JSON.stringify(userData),
        headers: {
          'content-type': 'application/json',
          'user-id': user.id + ''
        }
      });
      if (response.status === 404) alert('user not found');
      else if (!response.ok) throw new Error(response.status + '');
      const data = await response.json();
      userDispatch({ type: "UPDATE_USER", data });
      setUserData(user);
      close();
    } catch (e) {
      console.log(e);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <Modal open={open} onClose={() => close()} aria-labelledby="update-modal-title" aria-describedby="update-modal-description">

      <Box component="form" onSubmit={handleSubmit} sx={loginBoxStyle}>

        <Typography variant="h6" component="h1" textAlign="center" id="update-modal-title">Update</Typography>

        {["firstName", "lastName", "email", "password", "phone", "address"].map((field) => (
          <TextField
            key={field}
            id={field}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            variant="outlined"
            fullWidth
            value={userData[field as keyof User]}
            onChange={(e) => handleChange(e.target.id, e.target.value)} />
        ))}

        <Button type="submit" variant="contained" fullWidth startIcon={<SaveIcon />}>Save</Button>
      </Box>
    </Modal>
  );
};

export default Update;
