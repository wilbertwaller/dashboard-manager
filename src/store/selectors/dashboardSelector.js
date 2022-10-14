import { createSelector } from "@reduxjs/toolkit"
import { filter, find, map } from "lodash"

const selectDashboardState = state => state.dashboard

export const selectDashboards = state => selectDashboardState(state).dashboards

export const selectDashboardId = state => selectDashboardState(state).selectedId

export const selectDashboard = createSelector(
  selectDashboards,
  selectDashboardId,
  (dashboards, id) => find(dashboards, d => d.id === id)
)

export const selectTitlesOfSelectedType = createSelector(
  selectDashboards,
  selectDashboard,
  (dashboards, dashboard) => map(
    filter(dashboards, d => d.isExercise === dashboard.isExercise),
    'title'
  )
)
