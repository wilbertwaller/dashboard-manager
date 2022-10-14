import { Alert, FormHelperText, Grid } from '@mui/material'
import { Form, Formik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import { saveDashboard } from '../../../store/reducers/dashboardReducer'
import { Text, YesNo } from '../../Form'
import Modal, { FormActions } from '../../Modal'

export default function AddDashboard({ open, handleClose }) {
  const dispatch = useDispatch()

  const initialValues = {
    title: '',
    isExercise: false
  }

  const validationSchema = yup.object({
    title: yup.string()
      .max(50, 'Must be 50 characters or less')
      .required('Required'),
    isExercise: yup.boolean()
      .required('Required')
  })

  const onSubmit = values => {
    dispatch(saveDashboard(values))
    handleClose()
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
      validateOnMount
    >
      { ({ values }) => (
        <Form>
          <Modal
            open={open}
            handleClose={handleClose}
            actions={<FormActions handleClose={handleClose} />}
            title='Create Dashboard'
          >
            <div>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Text
                    label='Title'
                    name='title'
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <YesNo
                    label='Is Exercise?'
                    name='isExercise'
                    row
                  >
                    <FormHelperText>
                      All data is considered {values?.isExercise ? 'exercise' : 'real world'} data.
                    </FormHelperText>
                    <Alert severity='warning'>Please be aware this is the only time you can set this value.</Alert>
                  </YesNo>
                </Grid>
              </Grid>
            </div>
          </Modal>
        </Form>
      ) }
    </Formik>
  )
}
