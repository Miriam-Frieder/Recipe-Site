import React, { useContext, useState } from "react";
import {
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from '@mui/icons-material/Logout';
import Update from "./UserUpdate";
import { UserContext } from "./UserContext";

function stringToColor(string: String) {
  let hash = 0;
  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

function stringAvatar(firstName: String, lastName: String) {
  return {
    alt: `${firstName}${lastName}`,
    sx: {
      bgcolor: stringToColor(`${firstName}${lastName}`),
      m: 1,
    },
    children: `${firstName[0] ?? " "}${lastName[0] ?? " "}`,
  };
}

const UserAvatar = () => {
  const { user,userDispatch } = useContext(UserContext);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    userDispatch({
      type: "DELETE_USER",
    });
  };

  return (
    <>
      <IconButton onClick={handleMenuOpen}>
        <Avatar {...stringAvatar(user?.firstName ?? " ", user?.lastName ?? " ")} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() => {
            setIsUpdateOpen(true);
            handleMenuClose();
          }}
        >
          <ManageAccountsIcon sx={{ mr: 1 }} /> Update
        </MenuItem>
        <MenuItem onClick={handleLogout}>
        <LogoutIcon sx={{ mr: 1 }}/>Logout
        </MenuItem>
      </Menu>
      <Typography variant="h6" component="div" sx={{ m: 1 }}>
        {user?.firstName} {user?.lastName}
      </Typography>
      <Update open={isUpdateOpen} close={() => setIsUpdateOpen(false)} />
    </>
  );
};

export default UserAvatar;
