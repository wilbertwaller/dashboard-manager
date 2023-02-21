import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Tab, Tooltip } from '@mui/material'
import { map } from 'lodash'
import React from 'react'

export default function Tabs({ context = 'tab', value, onChange, list, iconOnly, centered }) {
  return (
    <TabContext value={value}>
      <TabList onChange={onChange} centered={centered}>
        { map(list, (item, i) => {
          const { icon, selected } = item
          const key = `${context}-${i}-tab`
          return iconOnly
            ? <TabWithTooltip
                key={key}
                icon={icon}
                value={selected}
              />
            : <Tab
                key={key}
                icon={icon}
                iconPosition='start'
                label={selected}
                value={selected}
              />
        }) }
      </TabList>
      { map(list, (item, i) => {
        const { element, selected } = item
        return (
          <TabPanel
            key={`${context}-${i}-content`}
            value={selected}
            sx={{ padding: '1rem 0' }}
          >
            { element }
          </TabPanel>
        )
      }) }
    </TabContext>
  )
}

export function TabWithTooltip(props) {
  return (
    <Tooltip title={props.value}>
      <Tab {...props } />
    </Tooltip>
  )
}
