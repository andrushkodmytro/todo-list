import { createSlice } from '@reduxjs/toolkit'

export const STATUSES = {
  TODO: { value: 'TODO', keyName: 'todo', title: 'Todo' },
  IN_PROGRESS: {
    value: 'IN_PROGRESS',
    keyName: 'inProgress',
    title: 'In progress',
  },
  DONE: { value: 'DONE', keyName: 'done', title: 'Done' },
}

const initialState = {
  todo: [],
  inProgress: [],
  done: [],
  draggedTask: {},
  deletedTask: {},
  showDeleteDialog: false,
}

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    setDraggedTask: (state, { payload }) => {
      state.draggedTask = payload
    },
    setInitTodos: (state, { payload }) => {
      state.todo = payload.todo
      state.done = payload.done
    },
    dropTask: (state, { payload }) => {
      state[payload.toStatus].push(payload.task)
      state[payload.fromStatus] = state[payload.fromStatus].filter(
        (task) => task.id !== payload.task.id,
      )
      state.draggedTask = {}
    },
    closeDeleteDialog: (state) => {
      state.showDeleteDialog = false
      state.deletedTask = {}
    },
    showDeleteDialog: (state, { payload }) => {
      state.deletedTask = payload
      state.showDeleteDialog = true
    },
    deleteTask: (state) => {
      state.inProgress = state.inProgress.filter(
        (task) => task.id !== state.deletedTask.id,
      )
      state.deletedTask = {}
      state.showDeleteDialog = false
    },
    deleteAllCompletedTask: (state) => {
      state.done = []
    },
  },
})

export const {
  setDraggedTask,
  setInitTodos,
  dropTask,
  closeDeleteDialog,
  showDeleteDialog,
  deleteTask,
  deleteAllCompletedTask,
} = todoListSlice.actions

export default todoListSlice.reducer
