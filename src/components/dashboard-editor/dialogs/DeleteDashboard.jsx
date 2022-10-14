import { Alert } from '@mui/material'
import { Form, Formik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeDashboard } from '../../../store/reducers/dashboardReducer'
import { selectDashboard } from '../../../store/selectors/dashboardSelector'
import Modal, { FormActions } from '../../Modal'

export default function DeleteDashboard({ open, handleClose }) {
  const dispatch = useDispatch()
  const dashboard = useSelector(selectDashboard)

  const onSubmit = values => {
    dispatch(removeDashboard(values.id))
    handleClose()
  }

  return (
    <Formik
      initialValues={{ id: dashboard.id }}
      onSubmit={onSubmit}
    >
      <Form>
        <Modal
          open={open}
          handleClose={handleClose}
          actions={<FormActions handleClose={handleClose} isDelete />}
          title='Delete Dashboard'
        >
          <div>
            <p>Are you sure you want to delete {dashboard.title}?</p>
            <Alert severity='warning'>This action is irreversible.</Alert>
          </div>
        </Modal>
      </Form>
    </Formik>
  )
}
