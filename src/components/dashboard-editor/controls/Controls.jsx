import { Add, ContentCopy, Delete, Save } from '@mui/icons-material'
import { Autocomplete, Button, Divider, Grid, TextField } from '@mui/material'
import { useFormikContext } from 'formik'
import { find, map } from 'lodash'
import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EditorContext } from '../../../pages/DashboardManager'
import { setSelectedId } from '../../../store/reducers/dashboardReducer'
import { selectDashboardId, selectDashboards } from '../../../store/selectors/dashboardSelector'
import AddDashboard from '../dialogs/AddDashboard'
import CloneDashboard from '../dialogs/CloneDashboard'
import DeleteDashboard from '../dialogs/DeleteDashboard'

export default function Controls() {
  const { setDialogForm } = useContext(EditorContext).actions
  const selected = useSelector(selectDashboardId)
  const form = useFormikContext()

  const addDashboard = () => setDialogForm(
    <AddDashboard open={true} handleClose={() => setDialogForm(null)} />
  )
  const cloneDashboard = () => setDialogForm(
    <CloneDashboard open={true} handleClose={() => setDialogForm(null)} />
  )
  const deleteDashboard = () => setDialogForm(
    <DeleteDashboard open={true} handleClose={() => setDialogForm(null)} />
  )

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
            variant='outlined'
            color='primary'
            startIcon={<Add />}
            onClick={addDashboard}
          >
            New
          </Button>
        </Grid>

        { selected && (<>
          <Grid item>
            <Button
              variant='outlined'
              color='primary'
              startIcon={<ContentCopy />}
              onClick={cloneDashboard}
            >
              Clone
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant='outlined'
              color='error'
              startIcon={<Delete />}
              onClick={deleteDashboard}
            >
              Delete
            </Button>
          </Grid>

          <Divider orientation='vertical' flexItem sx={{ ml: 2 }} />

          <Grid item>
            <Button
              variant='contained'
              color='primary'
              startIcon={<Save />}
              type='submit'
              disabled={!form.isValid}
            >
              Save
            </Button>
          </Grid>
        </>) }
      </Grid>
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
