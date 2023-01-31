import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React, { createContext, useMemo, useState } from 'react'
import Content from './content/Content';
import Footer from './footer/Footer';
import Header from './header/Header';

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import './App.css'

export const ColorModeContext = createContext({ toggleColorMode: () => {} })

function App() {
  const [mode, setMode] = useState('light')

  const colorMode = useMemo(() => ({
    toggleColorMode: () => setMode(prevMode => prevMode === 'light' ? 'dark' : 'light')
  }), [])

  const theme = useMemo(() => createTheme({
    palette: { mode }
  }), [mode])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Content />
        <Footer />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
