import { useContext } from 'react';
import { AppBar, Typography, Dialog, Box, Container, Divider } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from '../context/AccountProvider';

const dialogStyle = {
    marginTop: '9%',
    height: '68%',
    width: '34%',
    borderRadius: '3px',
    overflow: 'hidden',
    backgroundColor: '#eeeee',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
};

const Login = ({ isUserAuthenticated }) => {
    const navigate = useNavigate();
    const { setAccount } = useContext(AccountContext);

    const onLoginSuccess = async (res) => {
        let decoded = jwt_decode(res.credential);
        setAccount({
            name: decoded.name,
            picture: decoded.picture
        });
        navigate('/home');
        isUserAuthenticated(true);
        console.log(decoded);
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    return (
        <Box sx={{ backgroundColor: "#EEEEEE", height: "100vh" }}>
            <AppBar sx={{ backgroundColor: "#222831", color: "white", height: "275px" }}>
                <Container>
                    <Dialog
                        open={true}
                        BackdropProps={{ style: { backgroundColor: 'unset' } }}
                        maxWidth={'md'}
                        PaperProps={{ sx: dialogStyle }}
                    >
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h4" textAlign="center" mb={3} color="#00ADB5">
                                Sign In to continue
                            </Typography>
                            <Divider sx={{ mb:2 }} color="#00ADB5" />
                            <Typography variant="h6" textAlign="center" mb={3} color="#222831">
                                Instructions to use:
                            </Typography>
                            <Typography variant="body1" textAlign="left" mb={2} color="#393E46">
                                <ol>
                                    <li>Sign in using your Google account.</li>
                                    <li>Enter the data required in the form fields.</li>
                                    <li>Click the run button to see results of the simulation.</li>
                                    <li>Cards can be deleted/modified after creation.</li>
                                </ol>
                            </Typography>
                        </Box>
                        <GoogleLogin
                            buttonText=""
                            onSuccess={onLoginSuccess}
                            onError={onLoginFailure}
                        />
                    </Dialog>
                </Container>
            </AppBar>
        </Box>
    );
}

export default Login;