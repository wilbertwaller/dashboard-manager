import { Cancel, Close, Delete, Save } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material'
import { useFormikContext } from 'formik'
import React from 'react'

export default function Modal({ children, ...props }) {
  const { open, handleClose, title, actions } = props

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        { title }
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        { children }
      </DialogContent>

      { actions && (
        <DialogActions>
          { actions }
        </DialogActions>
      ) }
    </Dialog>
  )
}

export function FormActions({ handleClose, isDelete }) {
  const form = useFormikContext()
  return (<>
    <Button
      onClick={handleClose}
      variant='outlined'
      color='primary'
      startIcon={<Cancel />}
      sx={{ mr: 2 }}
    >
      Cancel
    </Button>
    { isDelete ? (
      <Button
        onClick={form.submitForm}
        variant='contained'
        color='error'
        startIcon={<Delete />}
        type='submit'
        disabled={!form.isValid}
      >
        Delete
      </Button>
    ) : (
      <Button
        onClick={form.submitForm}
        variant='contained'
        color='primary'
        startIcon={<Save />}
        type='submit'
        disabled={!form.isValid}
      >
        Save
      </Button>
    ) }
  </>)
}

export function InfoAction({ handleClose }) {
  return (
    <Button
      onClick={handleClose}
      variant='contained'
      color='primary'
    >
      Close
    </Button>
  )
}
