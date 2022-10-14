import { Grid } from '@mui/material'
import { Form, Formik } from 'formik'
import { cloneDeep } from 'lodash'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { saveDashboard } from '../../../store/reducers/dashboardReducer'
import { selectDashboard, selectTitlesOfSelectedType } from '../../../store/selectors/dashboardSelector'
import { Text } from '../../Form'
import Modal, { FormActions } from '../../Modal'

export default function CloneDashboard({ open, handleClose }) {
  const dispatch = useDispatch()
  const dashboard = cloneDeep(useSelector(selectDashboard))
  const titles = useSelector(selectTitlesOfSelectedType)
  
  if (dashboard) {
    delete dashboard.id
    dashboard.title = `${dashboard.title} (copy)`
  }

  const validationSchema = yup.object({
    title: yup.string()
      .max(50, 'Must be 50 characters or less')
      .notOneOf(titles, 'Must be unique')
      .required('Required')
      .trim()
  })

  const onSubmit = values => {
    const dashboard = cloneDeep(values)
    dashboard.title = values.title.trim()
    dispatch(saveDashboard(dashboard))
    handleClose()
  }

  return (
    <Formik
      initialValues={dashboard}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
      validateOnMount
    >
      <Form>
        <Modal
          open={open}
          handleClose={handleClose}
          actions={<FormActions handleClose={handleClose} />}
          title='Clone Dashboard'
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Text
                label='Title'
                name='title'
                fullWidth
              />
            </Grid>
          </Grid>
        </Modal>
      </Form>
    </Formik>
  )
}
