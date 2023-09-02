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
    padding: '4px',
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

  const removeDraggedImg = () => {
    var hideDragImage = document.getElementById('hiddenDragImage')
    var dragImage = document.getElementById('dragImage')

    hideDragImage.remove()
    dragImage.remove()
  }

  const onDragStart = (e, todo) => {
    dispatch(setDraggedTask(todo))
    // mouse coordinate
    var rect = e.target.getBoundingClientRect()
    var x = e.clientX - rect.left
    var y = e.clientY - rect.top

    // create clone
    var hideDragImage = e.target.cloneNode(true)
    hideDragImage.id = 'hiddenDragImage'

    var dragImage = e.target.cloneNode(true)
    dragImage.id = 'dragImage'
    dragImage.style.position = 'absolute'
    dragImage.dataset.x = x
    dragImage.dataset.y = y
    dragImage.style.width = e.target.offsetWidth - 32 + 'px'
    dragImage.style.pointerEvents = 'none'

    hideDragImage.style.opacity = 0
    document.body.appendChild(hideDragImage)
    document.body.appendChild(dragImage)
    e.dataTransfer.setDragImage(hideDragImage, 0, 0)
  }

  const onDragEnd = (e) => {
    removeDraggedImg()
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
    removeDraggedImg()
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
