import { useEffect } from 'react'
import { Box, Container, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import service from '../../service'
import {
  STATUSES,
  setInitTodos,
  closeDeleteDialog,
  deleteTask,
} from './todoListSlice'
import Column from './components/Column'
import DeleteDialog from './components/DeleteDialog'
import avatar1Url from '../../assets/avatar-1.jpg'
import avatar2Url from '../../assets/avatar-2.jpg'
import avatar3Url from '../../assets/avatar-3.jpg'

const styles = {
  todoListPage: {
    padding: '80px 0',
    userSelect: 'none',
  },
  mainTitle: { marginBottom: '20px' },
  list: {
    display: 'flex',
    gap: '20px',
  },
}

const images = {
  avatar1Url: avatar1Url,
  avatar2Url: avatar2Url,
  avatar3Url: avatar3Url,
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const columns = Object.values(STATUSES)

const TodoList = () => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.todoList)

  useEffect(() => {
    const getTodos = async () => {
      const { data } = await service.get('/todos?_start=0&_limit=20')

      const newData = data.reduce(
        (prev, next) => {
          const imgIndex = randomIntFromInterval(1, 3)
          if (next.completed) {
            prev.done.push({
              ...next,
              status: STATUSES.DONE.value,
              imgUrl: images[`avatar${imgIndex}Url`],
            })
            return prev
          }

          prev.todo.push({
            ...next,
            status: STATUSES.TODO.value,
            imgUrl: images[`avatar${imgIndex}Url`],
          })
          return prev
        },
        { todo: [], done: [] },
      )

      dispatch(setInitTodos(newData))
    }

    getTodos()
  }, [dispatch])

  const onCloseDeleteDialog = () => {
    dispatch(closeDeleteDialog({}))
  }

  const onDeleteTask = () => {
    dispatch(deleteTask())
  }

  return (
    <Container>
      <Box sx={styles.todoListPage}>
        <Typography variant='h3' component='h1' sx={styles.mainTitle}>
          Todo List
        </Typography>

        <Box sx={styles.list}>
          {columns.map(({ title, value }) => {
            return (
              <Column
                key={value}
                value={value}
                title={title}
                todos={data[STATUSES[value].keyName]}
              />
            )
          })}
        </Box>
      </Box>

      <DeleteDialog
        open={data.showDeleteDialog}
        handleClose={onCloseDeleteDialog}
        onSubmit={onDeleteTask}
      />
    </Container>
  )
}

export default TodoList
