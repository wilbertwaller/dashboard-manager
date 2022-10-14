import { Add, ContentCopy, Delete } from '@mui/icons-material'
import { Autocomplete, Button, Grid, TextField } from '@mui/material'
import { find, map } from 'lodash'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedId } from '../../../store/reducers/dashboardReducer'
import { selectDashboardId, selectDashboards } from '../../../store/selectors/dashboardSelector'
import { FORM_TYPE } from '../../Form'
import AddDashboard from '../dialogs/AddDashboard'
import CloneDashboard from '../dialogs/CloneDashboard'

export default function Controls() {
  const selected = useSelector(selectDashboardId)
  const [form, setForm] = useState(null)

  const handleClose = () => setForm(null)

  const openDialog = type => {
    switch (type) {
      case FORM_TYPE.NEW: return setForm(
        <AddDashboard open={true} handleClose={handleClose} />
      )
      case FORM_TYPE.CLONE: return setForm(
        <CloneDashboard open={true} handleClose={handleClose} />
      )
      default:
    }
  }

  return (
    <div>
      <h3>Manage</h3>

      <p>
        Select a dashboard to Edit, Clone, or Delete.
        Otherwise, click New to create a new dashboard.
      </p>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <DashboardSelect />
        </Grid>

        <Grid item>
          <Button
            variant='contained'
            color='primary'
            startIcon={<Add />}
            onClick={() => openDialog(FORM_TYPE.NEW)}
          >
            New
          </Button>
        </Grid>

        { selected && (<>
          <Grid item>
            <Button
              variant='contained'
              color='primary'
              startIcon={<ContentCopy />}
              onClick={() => openDialog(FORM_TYPE.CLONE)}
            >
              Clone
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              color='error'
              startIcon={<Delete />}
              onClick={() => openDialog(FORM_TYPE.DELETE)}
            >
              Delete
            </Button>
          </Grid>
        </>) }
      </Grid>

      { form }
    </div>
  )
}

export function DashboardSelect() {
  const dispatch = useDispatch()
  const dashboards = useSelector(selectDashboards)
  const id = useSelector(selectDashboardId)
  const options = map(dashboards, dashboard => ({
    id: dashboard.id,
    dataType: dashboard.isExercise ? 'Exercise' : 'Real World',
    title: dashboard.title
  }))
  const selected = find(options, option => option.id === id) || ''

  const handleChange = (e, value) => dispatch(setSelectedId(value.id))

  return (
    <Autocomplete
      options={options.sort((a, b) => -a.dataType.localeCompare(b.dataType))}
      groupBy={option => option.dataType}
      getOptionLabel={option => option.title || ''}
      fullWidth
      renderInput={params => <TextField {...params} label='Dashboard' />}
      onChange={handleChange}
      value={selected}
      disableClearable
    />
  )
}
