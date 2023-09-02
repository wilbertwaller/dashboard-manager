import { Typography } from '@mui/material'
import { values } from 'lodash'
import { find } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { NavItem } from './NavSection'

export default function PageTitle({ pageTitle }) {
  const location = useLocation()
  const [title, setTitle] = useState('')

  useEffect(() => {
    const label = pageTitle || find(values(NavItem), ['to', location.pathname])?.label || ''
    document.title = label
    setTitle(label)
  }, [pageTitle, location.pathname])

  return (
    <Typography variant='h6'>{title}</Typography>
  )
}
