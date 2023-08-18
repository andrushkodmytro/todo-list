import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  draggedTask: {},
}

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    setDraggedTask: (state, { payload }) => {
      state.draggedTask = payload
    },
  },
})

export const { increment } = todoListSlice.actions

export default todoListSlice.reducer
