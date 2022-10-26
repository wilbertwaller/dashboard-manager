import { Chat, List, TableChart } from '@mui/icons-material'
import { Button, ButtonGroup, Tooltip } from '@mui/material'
import { map } from 'lodash'
import React from 'react'

export const components = [
  { icon: <TableChart />, title: 'Table' },
  { icon: <List />, title: 'List' },
  { icon: <Chat />, title: 'Chat' }
]

export default function ComponentList() {
  return (
    <div>
      <h3>Components</h3>
      <ButtonGroup variant='contained'>
        { map(components, (component, i) => (
          <Tooltip key={`component-${i}-tooltip`} title={component.title}>
            <Button key={`component-${i}-button`}>{ component.icon }</Button>
          </Tooltip>
        )) }
      </ButtonGroup>
    </div>
  )
}
