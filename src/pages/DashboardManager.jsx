import { Settings, ViewComfy } from '@mui/icons-material'
import { Form, Formik } from 'formik'
import { values } from 'lodash'
import React, { createContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import Controls from '../components/dashboard-editor/controls/Controls'
import General from '../components/dashboard-editor/general/General'
import Layout from '../components/dashboard-editor/layout/Layout'
import Tabs from '../components/Tabs'
import { saveDashboard } from '../store/reducers/dashboardReducer'
import { selectDashboard } from '../store/selectors/dashboardSelector'

export const EditorContext = createContext()

export const EDITOR = {
  GENERAL: { element: <General />, icon: <Settings />, selected: 'General' },
  LAYOUT: { element: <Layout />, icon: <ViewComfy />, selected: 'Layout' }
}

export default function DashboardManager() {
  const dispatch = useDispatch()
  const dashboard = useSelector(selectDashboard)

  const [editor, setEditor] = useState('General')
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

  return (<>
    <EditorContext.Provider
      value={{
        actions: { setDialogForm }
      }}
    >
      <Formik
        initialValues={dashboard}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
        validateOnMount
      >
        <Form>
          <Controls />

          { dashboard && (
            <Tabs
              context='editor'
              value={editor}
              onChange={handleEditorClick}
              list={values(EDITOR)}
              centered
            />
          ) }
        </Form>
      </Formik>

      { dialogForm }
    </EditorContext.Provider>
  </>)
}
