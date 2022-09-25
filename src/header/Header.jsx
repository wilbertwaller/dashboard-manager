import { Apps } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import PageTitle from '../components/PageTitle'

export default function Header() {
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

      </Toolbar>
    </AppBar>
  )
}
