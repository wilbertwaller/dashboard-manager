import { Settings, ViewComfy } from '@mui/icons-material'
import { Button, ButtonGroup } from '@mui/material'
import { map } from 'lodash'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Controls from '../components/dashboard-editor/controls/Controls'
import General from '../components/dashboard-editor/general/General'
import Layout from '../components/dashboard-editor/layout/Layout'
import { selectDashboard } from '../store/selectors/dashboardSelector'

export const EDITOR = {
  GENERAL: { selected: 'General', element: <General />, icon: <Settings /> },
  LAYOUT: { selected: 'Layout', element: <Layout />, icon: <ViewComfy /> }
}

export default function DashboardManager() {
  const dashboard = useSelector(selectDashboard)
  const [editor, setEditor] = useState(EDITOR.GENERAL)

  const handleEditorClick = key => {
    setEditor(EDITOR[key])
  }

  return (<>
    <Controls />

    { dashboard && (<>
      <ButtonGroup
        fullWidth
        variant='contained'
        sx={{ mt: 2 }}
      >
        { map(Object.keys(EDITOR), (key, i) => {
          const { icon, selected } = EDITOR[key]
          return (
            <Button
              key={`editor-${i}-button`}
              color={editor.selected === selected ? 'success' : 'primary'}
              startIcon={icon}
              onClick={() => handleEditorClick(key)}
            >
              { selected }
            </Button>
          )
        }) }
      </ButtonGroup>

      { editor.element }
    </>) }
  </>)
}
