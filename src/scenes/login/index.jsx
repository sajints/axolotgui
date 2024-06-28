import * as React from 'react';
import LoginForm from './loginForm';
import { Box, Container, Grid } from '@mui/material';
import axoloticon from "../../Icons/AxomeraMainLogo-1.png"
 const Login = () =>{
    return(
        <Box >
            <Container maxWidth="xl">
<Grid container spacing={2}>
    <Grid item xs={12} md={6} sm={6}>
    <Box display="flex" justifyContent="center" alignItems="center">
              <img width="180" height="30" src={axoloticon} title="Axolot" alt="Axolot" loading="lazy"></img>
                
              </Box>
    </Grid>
    <Grid item xs={12} md={6} sm={6} sx={{display:'flex' , justifyContent:"center" , alignItems:"center"}}>
        <Box sx={{alignItems:'center' , justifyContent:'center'}}>  <LoginForm/></Box>
  
    </Grid>
</Grid>
            </Container>
          
        </Box>
    )
}
export default Login;