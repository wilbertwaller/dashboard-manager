import React from 'react'
import { COMPONENT } from './ComponentList'

export default function ComponentConfig({ component }) {
  const { config, title } = COMPONENT[component]

  return (
    <div>
      <h3>{ title } Configuration</h3>

      { config }
    </div>
  )
}
