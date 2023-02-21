import { Cancel, DisplaySettings, FilterList, PushPin, Save, Settings, Sort as SortIcon, Title, WidthNormal } from '@mui/icons-material'
import { Button, Grid, MenuItem } from '@mui/material'
import { AgGridReact } from 'ag-grid-react'
import { useFormikContext } from 'formik'
import { cloneDeep, isEmpty } from 'lodash'
import { map } from 'lodash'
import React, { useState } from 'react'
import { BooleanCheckbox, Text } from '../../../Form'
import DeleteButton from '../../../ag-grid/cell-renderers/DeleteButton'
import EditButton from '../../../ag-grid/cell-renderers/EditButton'
import { useCallback } from 'react'
import Tabs from '../../../Tabs'

const FORM = {
  GENERAL: {
    icon: <Settings />,
    title: 'Columns',
    getPage: props => <General {...props} />
  },
  DISPLAY: {
    icon: <DisplaySettings />,
    title: 'Columns: Display',
    getPage: props => <Display {...props} />
  },
  FILTER: {
    icon: <FilterList />,
    title: 'Columns: Filter',
    getPage: props => <Filter {...props} />
  },
  HEADER: {
    icon: <Title />,
    title: 'Columns: Header',
    getPage: props => <Header {...props} />
  },
  PINNED: {
    icon: <PushPin />,
    title: 'Columns: Pinned',
    getPage: props => <Pinned {...props} />
  },
  SORT: {
    icon: <SortIcon />,
    title: 'Columns: Sort',
    getPage: props => <Sort {...props} />
  },
  WIDTH: {
    icon: <WidthNormal />,
    title: 'Columns: Width',
    getPage: props => <Width {...props} />
  },
}

const defaultPage = 'Columns'

export default function ColumnDefForm({ fieldArrayName }) {
  const { setFieldValue, values } = useFormikContext()
  const [isEditing, setIsEditing] = useState(false)
  const [columnNumber, setColumnNumber] = useState(-1)
  const [formPage, setFormPage] = useState(defaultPage)

  const tempFieldName = 'tempColumnDef'
  const colDef = {}

  const handleFormPageClick = (e, value) => {
    setFormPage(value)
  }

  const editColumn = (columnDef, index) => {
    setColumnNumber(index > -1 ? index : -1)
    setIsEditing(true)
    setFieldValue(tempFieldName, columnDef || colDef)
  }

  const cancel = () => {
    setIsEditing(false)
    setFieldValue(tempFieldName, colDef)
    setFormPage(defaultPage)
  }
  
  const save = () => {
    const columnDefs = cloneDeep(values[fieldArrayName])

    if (columnNumber < 0) columnDefs.push(values[tempFieldName])
    else columnDefs.splice(columnNumber, 1, values[tempFieldName])

    delete values[tempFieldName]

    setIsEditing(false)
    setFieldValue(fieldArrayName, columnDefs)
    setFormPage(defaultPage)
  }

  const tabList = map(
    Object.values(FORM),
    item => ({
      element: <div>
        { item.getPage({ fieldArrayName: tempFieldName, title: formPage.title }) }
        <FormActions cancel={cancel} save={save} />
      </div>,
      icon: item.icon,
      selected: item.title
    })  
  )

  return (<div>
    <Button
      variant='contained'
      color='primary'
      disabled={isEditing}
      sx={{ my: 1 }}
      onClick={() => editColumn()}
    >Add Column</Button>

    { isEditing && (
      <Tabs
        context='column-def-page'
        value={formPage}
        onChange={handleFormPageClick}
        list={tabList}
        iconOnly
      />
    ) }

    <ConfiguredColumns onEdit={editColumn} fieldArrayName={fieldArrayName} values={values} />
  </div>)
}

export function General({ fieldArrayName, title }) {
  return (<div>
    <h3>{ title }</h3>
    <Grid container spacing={2}>
      <Grid item>
        <Text
          label='Field'
          name={`${fieldArrayName}.field`}
        />
      </Grid>
      <Grid item>
        <BooleanCheckbox
          label='Checkbox Selection'
          name={`${fieldArrayName}.checkboxSelection`}
        />
      </Grid>
    </Grid>
  </div>)
}

export function Display({ fieldArrayName, title }) {
  return (<div>
    <h3>{ title }</h3>
    <Grid container spacing={2}>
      <Grid item>
        <BooleanCheckbox
          label='Hide'
          name={`${fieldArrayName}.hide`}
        />
      </Grid>
    </Grid>
  </div>)
}

export function Filter({ fieldArrayName, title }) {
  const none = 'none'
  const filterOptions = [none, 'agNumberColumnFilter', 'agTextColumnFilter', 'agDateColumnFilter']
  return (<div>
    <h3>{ title }</h3>
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Text
          label='Filter'
          name={`${fieldArrayName}.filter`}
          fullWidth
          select
        >
          { map(filterOptions, option => (
            <MenuItem
              key={option}
              value={option === none ? '' : option}
            >
              { option }
            </MenuItem>
          )) }
        </Text>
      </Grid>
    </Grid>
  </div>)
}

export function Header({ fieldArrayName, title }) {
  return (<div>
    <h3>{ title }</h3>
    <Grid container spacing={2}>
      <Grid item>
        <Text
          label='Header Name'
          name={`${fieldArrayName}.headerName`}
        />
      </Grid>
      <Grid item>
        <BooleanCheckbox
          label='Wrap Header Text'
          name={`${fieldArrayName}.wrapHeaderText`}
        />
      </Grid>
      <Grid item>
        <BooleanCheckbox
          label='Auto Header Height'
          name={`${fieldArrayName}.autoHeaderHeight`}
        />
      </Grid>
      <Grid item>
        <BooleanCheckbox
          label='Header Checkbox Selection'
          name={`${fieldArrayName}.headerCheckboxSelection`}
        />
      </Grid>
    </Grid>
  </div>)
}

export function Pinned({ fieldArrayName, title }) {
  const pinnedOptions = ['left', 'right', null]
  return (<div>
    <h3>{ title }</h3>
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <Text
          label='Pinned'
          name={`${fieldArrayName}.pinned`}
          fullWidth
          select
        >
          { map(pinnedOptions, option => (
            <MenuItem key={option} value={option}>
              { option === null ? 'null' : option }
            </MenuItem>
          )) }
        </Text>
      </Grid>
    </Grid>
  </div>)
}

export function Sort({ fieldArrayName, title }) {
  const sortOptions = ['asc', 'desc', null]
  return (<div>
    <h3>{ title }</h3>
    <Grid container spacing={2}>
      <Grid item>
        <BooleanCheckbox
          label='Sortable'
          name={`${fieldArrayName}.sortable`}
        />
      </Grid>
      <Grid item xs={2}>
        <Text
          label='Sort'
          name={`${fieldArrayName}.sort`}
          fullWidth
          select
        >
          { map(sortOptions, option => (
            <MenuItem key={option} value={option}>
              { option === null ? 'null' : option }
            </MenuItem>
          )) }
        </Text>
      </Grid>
      <Grid item>
        <Text
          label='Sort Index'
          name={`${fieldArrayName}.sortIndex`}
          inputProps={{ min: 0 }}
          type='number'
        />
      </Grid>
    </Grid>
  </div>)
}

export function Width({ fieldArrayName, title }) {
  return (<div>
    <h3>{ title }</h3>
    <Grid container spacing={2}>
      <Grid item>
        <Text
          label='Flex'
          name={`${fieldArrayName}.flex`}
          inputProps={{ min: 0 }}
          type='number'
        />
      </Grid>
      <Grid item>
        <Text
          label='Width'
          name={`${fieldArrayName}.width`}
          inputProps={{ min: 0 }}
          type='number'
        />
      </Grid>
      <Grid item>
        <BooleanCheckbox
          label='Resizable'
          name={`${fieldArrayName}.resizable`}
        />
      </Grid>
    </Grid>
  </div>)
}

export function FormActions({ cancel, save }) {
  return (<div style={{ margin: '1rem 0' }}>
    <Button
      onClick={cancel}
      variant='outlined'
      color='primary'
      startIcon={<Cancel />}
      sx={{ mr: 2 }}
    >
      Cancel
    </Button>
    <Button
      onClick={save}
      variant='contained'
      color='primary'
      startIcon={<Save />}
    >
      Save
    </Button>
  </div>)
}

export function ConfiguredColumns({ onEdit, fieldArrayName, values }) {
  const { setFieldValue } = useFormikContext()
  const columnDefs = [
    { headerName: 'Field', field: 'field', rowDrag: true },
    {
      headerName: 'Edit',
      cellRenderer: EditButton,
      cellRendererParams: { onEdit },
      pinned: 'right',
      width: 75
    },
    {
      headerName: 'Delete',
      cellRenderer: DeleteButton,
      pinned: 'right',
      width: 75
    }
  ]
  const defaultColDef = {
    flex: 1,
    resizable: true,
    autoHeaderHeight: true,
    wrapHeaderText: true
  }

  const onRowDragEnd = useCallback(({ api }) => {
    // Set new order of columns
    const columns = []
    api.forEachNode(node => columns.push(node.data))
    setFieldValue(fieldArrayName, columns)
  }, [setFieldValue, fieldArrayName])

  if (isEmpty(values?.columnDefs)) return

  return (<>
    <h3>Configured Columns</h3>
    <div className="ag-theme-alpine" style={{ height: '300px', marginTop: '1rem', width: '100%' }}>
      <AgGridReact
        rowData={values?.columnDefs || []}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowDragManaged={true}
        animateRows={true}
        onRowDragEnd={onRowDragEnd}
      />
    </div>
  </>)
}
