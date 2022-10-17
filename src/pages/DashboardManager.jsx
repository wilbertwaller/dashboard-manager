import { Settings, ViewComfy } from '@mui/icons-material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab } from '@mui/material'
import { Form, Formik } from 'formik'
import { map } from 'lodash'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import Controls from '../components/dashboard-editor/controls/Controls'
import AddDashboard from '../components/dashboard-editor/dialogs/AddDashboard'
import CloneDashboard from '../components/dashboard-editor/dialogs/CloneDashboard'
import DeleteDashboard from '../components/dashboard-editor/dialogs/DeleteDashboard'
import General from '../components/dashboard-editor/general/General'
import Layout from '../components/dashboard-editor/layout/Layout'
import { FORM_TYPE } from '../components/Form'
import { saveDashboard } from '../store/reducers/dashboardReducer'
import { selectDashboard } from '../store/selectors/dashboardSelector'

export const EDITOR = {
  GENERAL: 'General',
  LAYOUT: 'Layout'
}

export const getEditorProps = key => {
  switch (key) {
    case EDITOR.GENERAL: return { element: <General />, icon: <Settings /> }
    case EDITOR.LAYOUT: return { element: <Layout />, icon: <ViewComfy /> }
    default: return {}
  }
}

export default function DashboardManager() {
  const dispatch = useDispatch()
  const dashboard = useSelector(selectDashboard)

  const [editor, setEditor] = useState(EDITOR.GENERAL)
  const [dialogForm, setDialogForm] = useState(null)

  const validationSchema = yup.object({
    title: yup.string()
      .max(50, 'Must be 50 characters or less')
      .required('Required')
      .trim()
  })

  const onSubmit = values => {
    dispatch(saveDashboard(values))
  }

  const handleEditorClick = (e, value) => {
    setEditor(value)
  }

  const handleClose = () => setDialogForm(null)

  const openDialog = type => {
    switch (type) {
      case FORM_TYPE.NEW: return setDialogForm(
        <AddDashboard open={true} handleClose={handleClose} />
      )
      case FORM_TYPE.CLONE: return setDialogForm(
        <CloneDashboard open={true} handleClose={handleClose} />
      )
      case FORM_TYPE.DELETE: return setDialogForm(
        <DeleteDashboard open={true} handleClose={handleClose} />
      )
      default:
    }
  }

  return (<>
    <Formik
      initialValues={dashboard}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
      validateOnMount
    >
      <Form>
        <Controls openDialog={openDialog} />

        { dashboard && (
          <TabContext value={editor}>
            <Box sx={{ border: 1, borderColor: 'divider' }}>
              <TabList onChange={handleEditorClick} centered>
                { map(Object.values(EDITOR), (key, i) => {
                  const { icon } = getEditorProps(key)
                  return (
                    <Tab
                      key={`editor-${i}-tab`}
                      icon={icon}
                      iconPosition='start'
                      label={key}
                      value={key}
                    />
                  )
                }) }
              </TabList>
            </Box>
            { map(Object.values(EDITOR), (key, i) => {
              const { element } = getEditorProps(key)
              return (
                <TabPanel
                  key={`editor-${i}-content`}
                  value={key}
                  sx={{ padding: '2rem 0' }}
                >
                  { element }
                </TabPanel>
              )
            }) }
          </TabContext>
        ) }
      </Form>
    </Formik>

    { dialogForm }
  </>)
}
