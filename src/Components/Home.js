import React from 'react';
import Items from './Items';
import { Button, Box, Card, ThemeProvider, createTheme, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import TodoHigh from './TodoHigh'
import TodoMid from './TodoMid'
import TodoLow from './TodoLow'
export default function Home(props) {
  const appliedTheme = props.theme || localStorage.getItem('theme');

  // Use createTheme without passing options to get the default theme
  const theme = createTheme({
    palette: {
      mode: appliedTheme || 'light',
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box height="100vh" overflow="auto">
          <Card style={{borderRadius:"0px"}}>
            <div style={{ marginBottom: '5px', marginTop: "5px", display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
            <Typography style={{marginLeft:"50px"}} sx={{ fontWeight: 'bold' }} level="title-lg">
            All Todo's
          </Typography>
              <Button component={NavLink} to='/addtodo' variant="outlined">Add TODO</Button>
            </div>

            <Items />
            <Typography style={{marginLeft:"50px" , marginTop:"30px" , marginBottom:"30px"}} sx={{ fontWeight: 'bold' }} level="title-lg">
            High Priority Todo's
          </Typography>
            <TodoHigh/>
            <Typography style={{marginLeft:"50px" , marginTop:"30px" , marginBottom:"30px"}} sx={{ fontWeight: 'bold' }} level="title-lg">
            Medium Priority Todo's
          </Typography>
            <TodoMid/>
            <Typography style={{marginLeft:"50px" , marginTop:"30px" , marginBottom:"30px"}} sx={{ fontWeight: 'bold' }} level="title-lg">
            Low Priority Todo's
          </Typography>
            <TodoLow/>
          </Card>
         
        </Box>
      </ThemeProvider>
    </>
  );
}
