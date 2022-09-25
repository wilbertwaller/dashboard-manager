import { Typography } from '@mui/material'
import { values } from 'lodash'
import { find } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { NavItem } from '../header/NavSection'

export default function PageTitle() {
  const location = useLocation()
  const [title, setTitle] = useState('')

  useEffect(() => {
    const label = find(values(NavItem), ['to', location.pathname])?.label || ''
    document.title = label
    setTitle(label)
  }, [location.pathname])

  return (
    <Typography variant='h6'>{title}</Typography>
  )
}
