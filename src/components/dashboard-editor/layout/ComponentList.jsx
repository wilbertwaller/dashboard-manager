import { Chat, List, TableChart } from '@mui/icons-material'
import { Button, ButtonGroup, Tooltip } from '@mui/material'
import { map } from 'lodash'
import React from 'react'
import Table from '../../table/Table'
import TableConfig from '../../table/TableConfig'

export const COMPONENT = {
  TABLE: {
    config: <TableConfig />,
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
  return (
    <div>
      <h3>Components</h3>
      <ButtonGroup variant='contained'>
        { map(Object.keys(COMPONENT), (key, i) => {
          const { icon, title } = COMPONENT[key]
          return (
            <Tooltip key={`component-${i}-tooltip`} title={title}>
              <Button
                key={`component-${i}-button`}
                onClick={() => handleClick(key)}
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
