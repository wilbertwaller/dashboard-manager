import { Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import { useField } from 'formik'

export const FORM_TYPE = {
  NEW: 'new',
  CLONE: 'clone',
  DELETE: 'delete'
}

/*
  These form field components are meant to be used under a formik context
*/

export function BooleanCheckbox({ helperText, label, ...props }) {
  const [field, , helper] = useField({ ...props, type: 'checkbox' })

  return (<>
    <FormControlLabel
      {...field}
      {...props}
      control={<Checkbox checked={field.value} />}
      label={label}
      onChange={e => {
        helper.setValue(e.target.checked)
      }}
    />
    <FormHelperText>{ helperText }</FormHelperText>
  </>)
}

/**
 * Standard mui TextField. Provide 'select' prop & MenuItem options
 * as children to turn TextField into a mui Select component. 
 * @param {*} param0 
 * @returns 
 */
export function Text({ children, helperText, ...props }) {
  const [field, meta] = useField(props)
  const error = !!(meta.touched && meta.error)

  return (
    <TextField
      {...field}
      {...props}
      value={field.value || ''}
      helperText={error ? <span className='error'>{meta.error}</span> : helperText}
      error={error}
    >
      { props.select && children }
    </TextField>
  )
}

export function YesNo({ children, label, ...props }) {
  const [field, , helper] = useField(props)

  return (<>
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <RadioGroup
        {...field}
        {...props}
        value={field.value || ''}
        onChange={e => {
          helper.setValue(e.target.value === 'true')
        }}
      >
        <FormControlLabel value={true} control={<Radio checked={field.value === true} />} label='Yes' />
        <FormControlLabel value={false} control={<Radio checked={field.value === false} />} label='No' />
      </RadioGroup>
    </FormControl>
    { children }
  </>)
}
