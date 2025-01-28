import React from 'react';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
interface ExpandMoreProps {
    expand: boolean;
    onClick: () => void;
 }
const ExpandMore = ({ expand, onClick }:{ expand:boolean, onClick:Function}) => {
  return (
    <IconButton
      onClick={()=>onClick}
      style={{
        marginLeft: 'auto',
        transition: 'transform 0.2s ease-in-out',
        transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
      }}
    >
      <ExpandMoreIcon />
    </IconButton>
  );
};
export default ExpandMore