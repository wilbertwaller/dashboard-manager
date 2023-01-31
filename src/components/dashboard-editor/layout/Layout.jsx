import { Cancel } from '@mui/icons-material'
import { useFormikContext } from 'formik'
import { filter, find, map } from 'lodash'
import React from 'react'
import ReactGridLayout, { WidthProvider } from 'react-grid-layout'
import ComponentList, { COMPONENT } from './ComponentList'
import { noOp } from '../../Util'

import 'react-grid-layout/css/styles.css'

const GridLayout = WidthProvider(ReactGridLayout)

export default function Layout() {
  const { values, setFieldValue } = useFormikContext()
  const layout = values?.layout || []
  const components = values?.components || []

  const onLayoutChange = layout => setFieldValue('layout', layout)

  const removeComponent = id => {
    const updatedComponents = filter(components, component => component.id !== id)
    const updatedLayout = filter(layout, gridItem => gridItem.i !== id)
    setFieldValue('components', updatedComponents)
    setFieldValue('layout', updatedLayout)
  }

  return (
    <div>
      <ComponentList />

      <h3>Layout</h3>
      <GridLayout
        className='layout'
        layout={layout}
        cols={12}
        isResizable={true}
        isBounded={true}
        onLayoutChange={onLayoutChange}
      >
        { map(layout, item => createGridItem(item, components, { removeComponent })) }
      </GridLayout>
    </div>
  )
}

export function createGridItem(item, components, action = {}) {
  const component = find(components, component => component.id === item.i)
  const { removeComponent = noOp } = action;
  return (
    <div
      key={item.i}
      className='grid-item'
      data-grid={item}
      style={{ overflow: 'auto' }}
    >
      { component ? COMPONENT[component.type].getComponent(component.config) : item.i }
      <span className='remove-layout-component' onClick={() => removeComponent(item.i)}>
        <Cancel fontSize='small' />
      </span>
    </div>
  )
}
