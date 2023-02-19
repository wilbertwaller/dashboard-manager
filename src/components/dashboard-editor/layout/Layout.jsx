import { Cancel, Edit } from '@mui/icons-material'
import { useFormikContext } from 'formik'
import { filter, find, map } from 'lodash'
import React from 'react'
import ReactGridLayout, { WidthProvider } from 'react-grid-layout'
import ComponentList, { COMPONENT } from './ComponentList'
import { noOp } from '../../Util'

import 'react-grid-layout/css/styles.css'
import { useContext } from 'react'
import { EditorContext } from '../../../pages/DashboardManager'

const GridLayout = WidthProvider(ReactGridLayout)

export default function Layout() {
  const { setDialogForm } = useContext(EditorContext).actions
  const { values, setFieldValue } = useFormikContext()
  const layout = values?.layout || []
  const components = values?.components || []

  const onLayoutChange = layout => setFieldValue('layout', layout)

  const editComponent = id => {
    const componentConfig = find(components, ['id', id])
    const component = COMPONENT[componentConfig.type]
    setDialogForm(
      component.getConfig({
        open: true,
        handleClose: () => setDialogForm(null),
        title: `Edit ${component.title} Component`,
        saveComponent: updateComponent,
        config: componentConfig.config
      })
    )
  }

  const updateComponent = values => {
    const updatedComponents = map(components, component => {
      if (component.id === values.id) return { ...component, config: values }
      return component
    })
    setFieldValue('components', updatedComponents)
  }

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
        { map(layout, item => createGridItem(item, components, { editComponent, removeComponent })) }
      </GridLayout>
    </div>
  )
}

export function createGridItem(item, components, action = {}) {
  const component = find(components, component => component.id === item.i)
  const { editComponent = noOp, removeComponent = noOp } = action;
  return (
    <div
      key={item.i}
      className='grid-item'
      data-grid={item}
      style={{ overflow: 'auto' }}
    >
      { component ? COMPONENT[component.type].getComponent(component.config) : item.i }
      <span className='edit-layout-component' onClick={() => editComponent(item.i)}>
        <Edit fontSize='small' />
      </span>
      <span className='remove-layout-component' onClick={() => removeComponent(item.i)}>
        <Cancel fontSize='small' />
      </span>
    </div>
  )
}
