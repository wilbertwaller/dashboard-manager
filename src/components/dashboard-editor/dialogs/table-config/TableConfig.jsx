import { Add, Cancel } from '@mui/icons-material'
import { Button, Grid, Tooltip } from '@mui/material'
import { AgGridReact } from 'ag-grid-react'
import { FieldArray, Form, Formik } from 'formik'
import { map } from 'lodash'
import React from 'react'
import { v4 as uuid } from 'uuid'
import * as yup from 'yup'
import { BooleanCheckbox, Text } from '../../../Form'
import Modal, { FormActions } from '../../../Modal'
import ColumnDefForm from './ColumnDefForm'
import { columnDefs, defaultColDef } from './table-config-grid-props'

export const colDef = {
  headerName: '',
  field: ''
}

export default function TableConfig({ open, handleClose, title, addComponent }) {
  const columnDefsName = 'columnDefs'
  const defaultColDefName = 'defaultColDef'

  const initialValues = {
    id: uuid(),
    columnDefs: [],
    defaultColDef: {
      sortable: false
    }
  }
  
  const validationSchema = yup.object({
    defaultColDef: yup.object({
      flex: yup.number().min(0, 'Must be a positive integer').integer('Must be an integer'),
      width: yup.number().min(0, 'Must be a positive integer').integer('Must be an integer')
    })
  })

  const onSubmit = values => {
    addComponent(values)
    handleClose()
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      { ({ values }) => (
        <Form>
          <Modal
            open={open}
            handleClose={handleClose}
            actions={<FormActions handleClose={handleClose} />}
            title={title}
            fullWidth
            maxWidth='lg'
          >
            <Text label='Title' name='title' />
            <DefaultColDefConfig
              fieldName={defaultColDefName}
              values={values}
            />
            <ColumnDefForm
              fieldArrayName={columnDefsName}
            />
          </Modal>
        </Form>
      ) }
    </Formik>
  )
}

export function ColumnDefTable({ fieldArrayName, values }) {
  return (
    <FieldArray name={fieldArrayName}>
      { ({ push }) => (<>
        <Grid container spacing={2} alignItems='center'>
          <Grid item>
            <h3>Column Definition</h3>
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              color='primary'
              startIcon={<Add />}
              onClick={() => push(colDef)}
            >
              Add Column
            </Button>
          </Grid>
        </Grid>
        <div className="ag-theme-alpine" style={{ height: '300px', marginTop: '1rem', width: '100%' }}>
          <AgGridReact
            rowData={values?.columnDefs || []}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
          />
        </div>
      </>) }
    </FieldArray>
  )
}

export function ColumnDefFieldArray({ fieldArrayName, values }) {
  return (
    <FieldArray name={fieldArrayName}>
      { ({ push, remove }) => (<>
        <Button
          variant='contained'
          color='primary'
          onClick={() => push(colDef)}
          sx={{ marginBottom: '1rem' }}
        >
          Add Column
        </Button>

        <Grid container spacing={2}>
          { values?.columnDefs.length > 0 &&
            map(values.columnDefs, (col, i) => (
              <Grid key={`colDef-${i}`} item>
                <div style={{ padding: '.5rem' }}>
                  <Text
                    label='Header Name'
                    name={`${fieldArrayName}[${i}].headerName`}
                  />
                </div>
                <div style={{ padding: '.5rem' }}>
                  <Text
                    label='Field'
                    name={`${fieldArrayName}[${i}].field`}
                  />
                </div>
                <div style={{ padding: '.5rem' }}>
                  <Tooltip title='Remove column'>
                    <Button
                      variant='contained'
                      color='error'
                      size='small'
                      onClick={() => remove(i)}
                    >
                      <Cancel />
                    </Button>
                  </Tooltip>
                </div>
              </Grid>
            ))
          }
        </Grid>
      </>) }
    </FieldArray>
  )
}

export function DefaultColDefConfig({ fieldName, values }) {
  return (<>
    <h3>Default Column Definition</h3>
    <p>Properties are applied to every column and can be overridden per column definition below.</p>

    <Grid container spacing={2}>
      <Grid item xs={2}>
        <Text
          helperText='Use instead of `width` to fill the remaining empty space of the grid'
          label='Flex'
          name={`${fieldName}.flex`}
          inputProps={{ min: 0 }}
          type='number'
        />
      </Grid>
      <Grid item xs={2}>
        <Text
          helperText='Initial width in pixels for the cell'
          label='Width'
          name={`${fieldName}.width`}
          inputProps={{ min: 0 }}
          type='number'
        />
      </Grid>
      <Grid item>
        <BooleanCheckbox
          label='Sortable'
          name={`${fieldName}.sortable`}
          helperText='Allow column sorting'
        />
      </Grid>
      <Grid item>
        <BooleanCheckbox
          label='Auto Header Height'
          name={`${fieldName}.autoHeaderHeight`}
          helperText='Automatically adjust header height'
        />
      </Grid>
      <Grid item>
        <BooleanCheckbox
          label='Wrap Header Text'
          name={`${fieldName}.wrapHeaderText`}
          helperText='Header names wrap onto next line'
        />
      </Grid>
      <Grid item>
        <BooleanCheckbox
          label='Resizable'
          name={`${fieldName}.resizable`}
          helperText='Allow column resizing'
        />
      </Grid>
    </Grid>
  </>)
}
