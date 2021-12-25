import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const UserInfo = () => {
    const navigate = useNavigate();
    const { logOut, user } = useAuth();
    console.log(user)
    const handleLogout = () => {
        logOut();
        navigate('/signup')

    }
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Box sx={{ height: '50%', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', p: 5, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Typography sx={{ textAlign: 'center', fontSize: '3vw' }}>Your Information</Typography>
                <Typography sx={{ textAlign: 'center', fontSize: '2vw', mt: '20px' }}>Name: {user.displayName}</Typography>
                <Typography sx={{ textAlign: 'center', fontSize: '2vw', mb: '20px' }}>Email: {user.email}</Typography>
                <Button
                    onClick={handleLogout}
                    variant='contained'>Sign Out</Button>


            </Box>
        </Box>
    );
};

export default UserInfo;