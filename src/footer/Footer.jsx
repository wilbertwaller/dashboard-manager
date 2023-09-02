import React from 'react'
import { useSelector } from 'react-redux'
import { selectDashboard } from '../store/selectors/dashboardSelector'
import ExerciseBanner from '../components/ExerciseBanner'
import { matchPath, useLocation } from 'react-router-dom'
import { NavItem } from '../components/NavSection'

export default function Footer() {
  const dashboard = useSelector(selectDashboard)
  const location = useLocation()

  return (<div style={{ width: '100%' }}>
   { (
    !!matchPath(location.pathname, NavItem.DASHBOARD.to) && dashboard?.isExercise
    ) && <ExerciseBanner /> }
  </div>)
}
