import { createSelector } from "@reduxjs/toolkit"
import { find } from "lodash"

const selectDashboardState = state => state.dashboard

export const selectDashboards = state => selectDashboardState(state).dashboards

export const selectDashboardId = state => selectDashboardState(state).selectedId

export const selectDashboard = createSelector(
  selectDashboards,
  selectDashboardId,
  (dashboards, id) => find(dashboards, d => d.id === id)
)