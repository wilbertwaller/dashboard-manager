import { Cancel } from '@mui/icons-material'
import { Button, Grid, Tooltip } from '@mui/material'
import { FieldArray, useFormikContext } from 'formik'
import { map } from 'lodash'
import React from 'react'
import { Text } from '../Form'

export const colDef = {
  headerName: '',
  field: ''
}

export default function TableConfig() {
  const { values } = useFormikContext()
  const fieldArrayName = 'tableConfig.columnDefs'

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
          { values?.tableConfig?.columnDefs.length > 0 &&
            map(values.tableConfig.columnDefs, (col, i) => (
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
