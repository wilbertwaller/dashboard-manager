import { Button, ButtonGroup } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { clear, notify, SEVERITY } from '../store/reducers/notificationReducer'

export default function Test() {
  const dispatch = useDispatch()

  const handleNotification = severity => {
    dispatch(clear())
    switch (severity) {
      case SEVERITY.ERROR:
        return dispatch(notify({ severity, message: 'Test error' }))
      case SEVERITY.WARNING:
        return dispatch(notify({ severity, message: 'Test warning' }))
      case SEVERITY.INFO:
        return dispatch(notify({ severity, message: 'Test info' }))
      case SEVERITY.SUCCESS:
        return dispatch(notify({ severity, message: 'Test success' }))
      default:
    }
  }

  return (
    <div>
      <h3>Notification</h3>
      <ButtonGroup>
        <Button onClick={() => handleNotification(SEVERITY.ERROR)}>
          Error
        </Button>
        <Button onClick={() => handleNotification(SEVERITY.WARNING)}>
          Warning
        </Button>
        <Button onClick={() => handleNotification(SEVERITY.INFO)}>
          Info
        </Button>
        <Button onClick={() => handleNotification(SEVERITY.SUCCESS)}>
          Success
        </Button>
      </ButtonGroup>
    </div>
  )
}
