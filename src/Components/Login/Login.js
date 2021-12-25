import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [signInData, setSignInData] = useState({});
    const { signInUser } = useAuth();
    console.log(signInData)

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newSignInData = { ...signInData }
        newSignInData[field] = value;
        setSignInData(newSignInData);
    }

    const handleSignInSubmit = e => {
        signInUser(signInData.email, signInData.password, location, navigate);
        e.preventDefault();
    }
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Box sx={{ width: '350px', height: '50%', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', p: 5 }}>
                <Typography sx={{ textAlign: 'center', fontSize: '2vw' }}>Sign In</Typography>
                <form onSubmit={handleSignInSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField
                        sx={{ marginTop: '30px', width: '100%' }}
                        label="Enter Your Email"
                        variant="standard"
                        name='email'
                        type='email'
                        onBlur={handleOnBlur} />
                    <TextField
                        sx={{ marginTop: '30px', width: '100%' }}
                        label="Enter Your Password"
                        variant="standard"
                        name='password'
                        type='password'
                        onBlur={handleOnBlur} />
                    <Button
                        sx={{ marginTop: '30px', width: '100%' }}
                        variant='contained'
                        type='submit'
                    >Sign In</Button>
                </form>
                <Typography
                    sx={{ marginTop: '30px' }}
                >Create an account? <Link to="/signup">Sign-Up</Link></Typography>

            </Box>
        </Box>
    );
};

export default Login;