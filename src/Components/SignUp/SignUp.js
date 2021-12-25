import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const SignUp = () => {
    const navigate = useNavigate();
    const [signUpData, setSignUpData] = useState({});
    const { signUpUser } = useAuth();
    console.log(signUpData)

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newSignUpData = { ...signUpData }
        newSignUpData[field] = value;
        setSignUpData(newSignUpData);
    }

    const handleSignUpSubmit = e => {
        signUpUser(signUpData.email, signUpData.password, signUpData.name, navigate);
        e.preventDefault();
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Box sx={{ width: '350px', height: '50%', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', p: 5 }}>
                <Typography sx={{ textAlign: 'center', fontSize: '2vw' }}>Sign Up</Typography>
                <form onSubmit={handleSignUpSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField
                        sx={{ marginTop: '30px', width: '100%' }}
                        label="Enter Your Full Name"
                        variant="standard"
                        name='name'
                        type='text'
                        onBlur={handleOnBlur} />
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
                    >Sign Up</Button>
                </form>
                <Typography
                    sx={{ marginTop: '30px' }}
                >Already have an account? <Link to="/signin">Sign-In</Link></Typography>

            </Box>
        </Box>
    );
};

export default SignUp;