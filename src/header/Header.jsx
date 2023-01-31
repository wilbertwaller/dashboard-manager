import { Apps, Brightness4, Brightness7 } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar, useTheme } from '@mui/material'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ColorModeContext } from '../App'
import PageTitle from '../components/PageTitle'

export default function Header() {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)

  return (
    <AppBar position='static'>
      <Toolbar>
        <Link to={'/'}>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            sx={{ mr: 2 }}
          >
            <Apps sx={{ color: 'white' }} />
          </IconButton>
        </Link>

        <PageTitle />

        <IconButton
          color='inherit'
          sx={{ ml: 'auto' }}
          onClick={colorMode.toggleColorMode}
        >
          { theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 /> }
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
