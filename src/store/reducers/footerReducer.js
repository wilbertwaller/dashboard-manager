import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  includeClassification: false,
  isExercise: false
}

export const footerSlice = createSlice({
  name: 'footer',
  initialState,
  reducers: {
    setIsExercise: (state, action) => {
      const { isExercise } = action.payload
      state.isExercise = isExercise
    }
  }
})

export const { setIsExercise } = footerSlice.actions

export default footerSlice.reducer
