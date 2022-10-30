import { Chat, List, TableChart } from '@mui/icons-material'
import { Button, ButtonGroup, Tooltip } from '@mui/material'
import { map } from 'lodash'
import React, { useContext } from 'react'
import { EditorContext } from '../../../pages/DashboardManager'
import Table from '../../table/Table'
import TableConfig from '../dialogs/TableConfig'

export const COMPONENT = {
  TABLE: {
    getConfig: props => <TableConfig {...props} />,
    element: <Table />,
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

export default function ComponentList({ handleClick }) {
  const { setDialogForm } = useContext(EditorContext).actions
  const props = {
    open: true,
    handleClose: () => setDialogForm(null)
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
                onClick={() => setDialogForm(getConfig(props))}
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
