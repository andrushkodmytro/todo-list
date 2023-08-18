import { configureStore } from '@reduxjs/toolkit'
import todoListSlice from './pages/todoList/todoListSlice'

export const store = configureStore({
  reducer: { todoList: todoListSlice },
})
