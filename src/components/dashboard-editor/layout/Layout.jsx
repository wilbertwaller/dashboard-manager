import { Cancel } from '@mui/icons-material'
import { useFormikContext } from 'formik'
import { filter, map } from 'lodash'
import React from 'react'
import ReactGridLayout, { WidthProvider } from 'react-grid-layout'
import ComponentList from './ComponentList'
import { noOp } from '../../Util'

import 'react-grid-layout/css/styles.css'

const GridLayout = WidthProvider(ReactGridLayout)

export default function Layout() {
  const { values, setFieldValue } = useFormikContext()
  const layout = values?.layout || []

  // const layout = [
  //   { i: 'a', x: 0, y: 0, w: 12, h: 1 },
  //   { i: 'b', x: 1, y: 0, w: 3, h: 1, minW: 2, maxW: 4 },
  //   { i: 'c', x: 4, y: 0, w: 1, h: 1 }
  // ]

  const onLayoutChange = layout => setFieldValue('layout', layout)

  const removeComponent = id => {
    const components = values?.components || []
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
        { map(layout, item => createGridItem(item, { removeComponent })) }
      </GridLayout>
    </div>
  )
}

export function createGridItem(item, action = {}) {
  const { removeComponent = noOp } = action;
  return (
    <div
      key={item.i}
      className='grid-item'
      data-grid={item}
    >
      { item.i }
      <span className='remove-layout-component' onClick={() => removeComponent(item.i)}>
        <Cancel fontSize='small' />
      </span>
    </div>
  )
}
