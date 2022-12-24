import { Chat, List, TableChart } from '@mui/icons-material'
import { Button, ButtonGroup, Tooltip } from '@mui/material'
import { useFormikContext } from 'formik'
import { cloneDeep } from 'lodash'
import { map } from 'lodash'
import React, { useContext } from 'react'
import { EditorContext } from '../../../pages/DashboardManager'
import Table from '../../table/Table'
import TableConfig from '../dialogs/table-config/TableConfig'

export const COMPONENT = {
  TABLE: {
    getConfig: props => <TableConfig {...props} />,
    getComponent: props => <Table {...props} />,
    icon: <TableChart />,
    title: 'Table'
  },
  LIST: {
    icon: <List />,
    title: 'List'
  },
  CHAT: {
    icon: <Chat />,
    title: 'Chat'
  }
}

export default function ComponentList() {
  const { setDialogForm } = useContext(EditorContext).actions
  const { values, setFieldValue } = useFormikContext()
  const props = {
    open: true,
    handleClose: () => setDialogForm(null)
  }

  const addComponentToDashboard = (config, type) => {
    // TODO properly implement adding to layout
    const { components = [], layout = [] } = values || {}
    const updatedComponents = cloneDeep(components)
    const updatedLayout = cloneDeep(layout)
    updatedComponents.push({ config, id: config.id, type })
    updatedLayout.push({
      i: config.id,
      x: layout.length*2%12,
      y: Infinity,
      w: 2,
      h: 2
    })
    setFieldValue('components', updatedComponents)
    setFieldValue('layout', updatedLayout)
  }

  return (
    <div>
      <h3>Components</h3>
      <ButtonGroup variant='contained'>
        { map(Object.keys(COMPONENT), (key, i) => {
          const { getConfig, icon, title } = COMPONENT[key]
          return (
            <Tooltip key={`component-${i}-tooltip`} title={title}>
              <Button
                key={`component-${i}-button`}
                onClick={() => setDialogForm(
                  getConfig({
                    ...props,
                    title: `Add ${title} Component`,
                    addComponent: values => addComponentToDashboard(values, key)
                  })
                )}
              >
                { icon }
              </Button>
            </Tooltip>
          )
        }) }
      </ButtonGroup>
    </div>
  )
}
