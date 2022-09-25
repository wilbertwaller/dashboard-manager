import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clear } from '../store/reducers/notificationReducer'

export default function Notification() {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  const anchorOrigin = {
    vertical: 'top',
    horizontal: 'center'
  }

  const handleClose = (event, reason) => {
    if (reason !== 'clickaway') {
      dispatch(clear())
    }
  }

  return (
    <Snackbar
      key={notification.key}
      open={notification.open}
      anchorOrigin={anchorOrigin}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={notification.severity} sx={{ width: '100%' }}>
        {notification.message}
      </Alert>
    </Snackbar>
  )
}
