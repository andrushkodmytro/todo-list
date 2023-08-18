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
  columnList: {
    padding: '4px',
    gap: '6px',
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 0',
  },
}

const Column = ({ value, title, todos }) => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.todoList)

  const onDragStart = (e, todo) => {
    dispatch(setDraggedTask(todo))
  }

  const onDragOver = (event) => {
    event.preventDefault()
  }

  const onDrop = (event, colName) => {
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
        sx={styles.columnList}
        onDrop={(e) => onDrop(e, value)}
        onDragOver={(e) => onDragOver(e)}
      >
        {todos.map((todo) => {
          return (
            <Card
              key={todo.id}
              todo={todo}
              onDragStart={onDragStart}
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
