
import React from 'react';
import { Outlet } from 'react-router';
import {ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from './scenes/global/Topbar';

const WithoutSidebar = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Topbar />
            <Outlet/>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
export default WithoutSidebar;