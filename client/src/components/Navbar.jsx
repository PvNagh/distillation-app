import { useContext } from 'react';
import { AppBar, Box, Toolbar, Typography, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { AccountContext } from '../context/AccountProvider';

const Navbar = () => {
  const { setAccount } = useContext(AccountContext);
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    navigate('/');
    setAccount('');
  }
  return (
    <AppBar sx={{ backgroundColor: "#222831", color: "white" }}>
      <FlexBetween padding="0.1rem 2%">
        <FlexBetween >
          <img src="https://upload.wikimedia.org/wikipedia/en/6/6f/Indian_Institute_of_Technology_Roorkee_logo.png" height="50" alt="IITR-logo"></img>
          <Toolbar>
            <Typography
              fontWeight="bold"
              fontSize="1.6rem"
            >
              Distillation App
            </Typography>
          </Toolbar>
        </FlexBetween>
        <Box>
          <HomeIcon sx={{ mr: 4, fontSize: 30, "&:hover": { cursor: "pointer" } }} color="inherit" >Home</HomeIcon>
          <ExitToAppIcon sx={{ fontSize: 28, "&:hover": { cursor: "pointer" } }} color="inherit" onClick={handleLogoutClick}>Logout</ExitToAppIcon>
        </Box>
      </FlexBetween>
      <CssBaseline />
    </AppBar>
  );
}

export default Navbar;