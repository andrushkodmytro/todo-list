import { useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
  STATUSES,
  setDraggedTask,
  dropTask,
  showDeleteDialog,
  deleteAllCompletedTask,
} from '../todoListSlice'
import Card from './Card'

const styles = {
  column: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 0',
    backgroundColor: '#f4f5f7',
    borderRadius: '8px',
  },
  columnTitle: {
    padding: '8px 16px',
    color: '#626972',
    fontWeight: '500',
  },
  columnList: (first) => ({
    padding: '2px',
    gap: '10px',
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 0',
    ...(first ? { outline: '2px dashed green' } : {}),
  }),
}

const Column = ({ value, title, todos }) => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.todoList)
  const [isFocused, setIsFocused] = useState(false)

  const onDragStart = (e, todo) => {
    e.target.style.opacity = '0.3'
    dispatch(setDraggedTask(todo))
  }

  const onDragEnd = (e) => {
    e.target.style.opacity = '1'
  }

  const onDragOver = (event) => {
    event.preventDefault()
  }

  const onDrop = (event, colName) => {
    setIsFocused(false)

    if (STATUSES[colName].value === STATUSES.TODO.value) return

    dispatch(
      dropTask({
        task: { ...data.draggedTask, status: STATUSES[colName].value },
        fromStatus: STATUSES[data.draggedTask.status].keyName,
        toStatus: STATUSES[colName].keyName,
      }),
    )
  }

  const onOpenDeleteDialog = (task) => {
    dispatch(showDeleteDialog(task))
  }

  const onDeleteAllCompletedTasks = () => {
    dispatch(deleteAllCompletedTask())
  }

  return (
    <Box key={value} sx={styles.column}>
      <Typography variant='h6' component='h2' sx={styles.columnTitle}>
        {title}
      </Typography>

      <Box
        sx={styles.columnList(isFocused)}
        onDrop={(e) => onDrop(e, value)}
        onDragOver={(e) => onDragOver(e)}
        onDragEnter={(e) => {
          if (e.currentTarget.contains(e.relatedTarget)) {
            return
          }

          setIsFocused(true)
        }}
        onDragLeave={(e) => {
          if (e.currentTarget.contains(e.relatedTarget)) {
            return
          }
          setIsFocused(false)
        }}
      >
        {todos.map((todo) => {
          return (
            <Card
              key={todo.id}
              todo={todo}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onOpenDeleteDialog={onOpenDeleteDialog}
            />
          )
        })}
      </Box>

      {value === STATUSES.DONE.value && (
        <Button
          variant='contained'
          color='error'
          onClick={onDeleteAllCompletedTasks}
        >
          Delete all completed tasks
        </Button>
      )}
    </Box>
  )
}

export default Column
