import React from 'react'
import { useSelector } from 'react-redux'
import { selectIsExercise } from '../store/selectors/footerSelector'
import ExerciseBanner from '../components/ExerciseBanner'

export default function Footer() {
  const isExercise = useSelector(selectIsExercise)

  return (<div style={{ width: '100%' }}>
   { isExercise && <ExerciseBanner /> }
  </div>)
}
