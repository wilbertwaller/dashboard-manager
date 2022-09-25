import { createSlice } from "@reduxjs/toolkit"
import { includes, values } from "lodash"

export const SEVERITY = {
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  SUCCESS: 'success'
}

export const getValidSeverity = severity => {
  if (includes(values(SEVERITY), severity)) return severity
  return SEVERITY.INFO
}

const initialState = {
  open: false,
  severity: SEVERITY.INFO,
  message: ''
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notify: (state, action) => {
      const { severity, message } = action.payload
      state.key = new Date().getTime()
      state.open = true
      state.severity = getValidSeverity(severity)
      state.message = message
    },
    clear: () => ({ ...initialState })
  }
})

export const { notify, clear } = notificationSlice.actions

export default notificationSlice.reducer
