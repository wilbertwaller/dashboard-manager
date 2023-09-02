import { Apps, Brightness4, Brightness7 } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar, useTheme } from '@mui/material'
import React, { useContext } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { ColorModeContext } from '../App'
import PageTitle from '../components/PageTitle'
import { useSelector } from 'react-redux'
import { selectDashboard } from '../store/selectors/dashboardSelector'
import { NavItem } from '../components/NavSection'

export default function Header() {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)
  const dashboard = useSelector(selectDashboard)
  const location = useLocation()
  const pageTitle = !!matchPath(location.pathname, NavItem.DASHBOARD.to) && dashboard.title

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

        <PageTitle pageTitle={pageTitle} />

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
