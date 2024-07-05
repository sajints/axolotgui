import * as React from 'react';
import LoginForm from './loginForm';
import { Box, Container, Grid } from '@mui/material';
import axoloticon from "../../Icons/AxomeraMainLogo-1.png"

const Login = () => {

    return (
        <Box sx={{ backgroundColor: '#141b2d', height: "100vh" }} >
            <Container maxWidth="xl" >
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} sm={6} sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: '100vh' }}>
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <img width="300" src={axoloticon} title="Axolot" alt="Axolot" loading="lazy"></img>

                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: '100vh' }}>
                        <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}> <LoginForm /></Box>

                    </Grid>
                </Grid>
            </Container>

        </Box>
    )
}
export default Login;