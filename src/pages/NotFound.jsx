import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { NavItem } from '../components/NavSection'
import { notify, SEVERITY } from '../store/reducers/notificationReducer'

export default function NotFound() {
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    dispatch(
      notify({
        severity: SEVERITY.WARNING,
        message: `${location.pathname} not found. Navigating back to home page.`
      })
    )
  }, [dispatch, location.pathname])

  return (
    <Navigate to={NavItem.HOME.to} />
  )
}
