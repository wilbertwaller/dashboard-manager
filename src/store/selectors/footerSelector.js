const selectFooterState = state => state.footer

export const selectIsExercise = state => selectFooterState(state).isExercise
