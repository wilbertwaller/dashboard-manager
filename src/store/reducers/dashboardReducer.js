import { createSlice } from "@reduxjs/toolkit";
import { filter } from "lodash";
import { map } from "lodash";
import { v4 as uuid } from "uuid";

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    dashboards: [],
    selectedId: ''
  },
  reducers: {
    saveDashboard: (state, { payload }) => {
      const dashboard = payload
      const id = payload.id
      let dashboards = state.dashboards

      if (!id) { // New
        dashboard.id = uuid()
        dashboards.push(dashboard)
      }
      else { // Update
        dashboards = map(dashboards, d => d.id === id ? dashboard : d)
      }

      state.dashboards = dashboards.sort((a, b) => a.title.localeCompare(b.title))
      state.selectedId = dashboard.id
    },
    removeDashboard: (state, { payload }) => {
      const dashboards = filter(state.dashboards, d => d.id !== payload)
      return {
        dashboards,
        selectedId: ''
      }
    },
    setSelectedId: (state, { payload }) => {
      state.selectedId = payload
    }
  }
})

export const {
  saveDashboard,
  removeDashboard,
  setSelectedId
} = dashboardSlice.actions

export default dashboardSlice.reducer
