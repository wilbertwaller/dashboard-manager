import { Cancel, DisplaySettings, FilterList, PushPin, Save, Settings, Sort as SortIcon, Title, WidthNormal } from '@mui/icons-material'
import { Button, ButtonGroup, Grid, Tooltip } from '@mui/material'
import { useFormikContext } from 'formik'
import { cloneDeep } from 'lodash'
import { map } from 'lodash'
import React, { useState } from 'react'
import { BooleanCheckbox, Text } from '../../../Form'

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

export default function ColumnDefForm({ fieldArrayName, columnDef }) {
  const { setFieldValue, values } = useFormikContext()
  const [isEditing, setIsEditing] = useState(false)
  const [formPage, setFormPage] = useState(FORM.GENERAL)

  const tempFieldName = 'tempColumnDef'
  const colDef = {}

  const editColumn = () => {
    setIsEditing(true)
    setFieldValue(tempFieldName, columnDef || colDef)
  }

  const cancel = () => {
    setIsEditing(false)
    setFieldValue(tempFieldName, colDef)
    setFormPage(FORM.GENERAL)
  }
  
  const save = () => {
    const columnDefs = cloneDeep(values[fieldArrayName])
    columnDefs.push(values[tempFieldName])

    setIsEditing(false)
    setFieldValue(fieldArrayName, columnDefs)
    setFormPage(FORM.GENERAL)
  }

  return (<div>
    <Button
      variant='contained'
      color='primary'
      disabled={isEditing}
      sx={{ my: 1 }}
      onClick={editColumn}
    >Add Column</Button>

    { isEditing && <div>
      <ButtonGroup variant='contained'>
        { map(Object.keys(FORM), (key, i) => {
          const { icon, title } = FORM[key]
          return (
            <Tooltip key={`column-def-page-${i}-tooltip`} title={title}>
              <Button
                key={`column-def-page-${i}-button`}
                color={formPage.title === title ? 'success' : 'primary'}
                onClick={() => setFormPage(FORM[key])}
              >{ icon }</Button>
            </Tooltip>
          )
        }) }
      </ButtonGroup>

      { formPage.getPage({ fieldArrayName: tempFieldName, title: formPage.title }) }

      <FormActions cancel={cancel} save={save} />
    </div> }
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
      <Grid item>
        <Text
          label='Type'
          name={`${fieldArrayName}.type`}
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
  return (<div>
    <h3>{ title }</h3>
    <Grid container spacing={2}>
      <Grid item>
        <Text
          label='Filter'
          name={`${fieldArrayName}.filter`}
        />
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
  return (<div>
    <h3>{ title }</h3>
    <Grid container spacing={2}>
      <Grid item>
        <Text
          label='Pinned'
          name={`${fieldArrayName}.pinned`}
        />
      </Grid>
    </Grid>
  </div>)
}

export function Sort({ fieldArrayName, title }) {
  return (<div>
    <h3>{ title }</h3>
    <Grid container spacing={2}>
      <Grid item>
        <BooleanCheckbox
          label='Sortable'
          name={`${fieldArrayName}.sortable`}
        />
      </Grid>
      <Grid item>
        <Text
          label='Sort'
          name={`${fieldArrayName}.sort`}
        />
      </Grid>
      <Grid item>
        <Text
          label='Sort Index'
          name={`${fieldArrayName}.sortIndex`}
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
        />
      </Grid>
      <Grid item>
        <Text
          label='Width'
          name={`${fieldArrayName}.width`}
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
