import { Box, Container, Typography } from '@mui/material'

const styles = {
  mainTitle: {

  },
  list: {
    display: 'flex',
    gap: '20px',
  },
  column: {
    flex: '1 0 0',
    backgroundColor: '#f4f5f7',
    borderRadius: '8px',
  },
  columnTitle: {
    padding: '8px 16px',
    color: '#626972',
    fontWeight: '500'
  },
  columnList: {
    padding: '4px',
    gap: '6px',
    display: 'flex',
    flexDirection: 'column',
  },
  cart: {
    padding: '8px 16px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    minHeight: '120px'
  },
}

const columns = [
  {
    id: 1,
    title: 'Todo',
  },
  {
    id: 2,
    title: 'In progress',
  },
  { id: 3, title: 'Done' },
]

const tasks = [
  {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
  },
  {
    "userId": 1,
    "id": 2,
    "title": "quis ut nam facilis et officia qui",
    "completed": false
  },
  {
    "userId": 1,
    "id": 3,
    "title": "fugiat veniam minus",
    "completed": false
  },
  {
    "userId": 1,
    "id": 4,
    "title": "et porro tempora",
    "completed": true
  },
  {
    "userId": 1,
    "id": 5,
    "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
    "completed": false
  },
  {
    "userId": 1,
    "id": 6,
    "title": "qui ullam ratione quibusdam voluptatem quia omnis",
    "completed": false
  },
  {
    "userId": 1,
    "id": 7,
    "title": "illo expedita consequatur quia in",
    "completed": false
  },
  {
    "userId": 1,
    "id": 8,
    "title": "quo adipisci enim quam ut ab",
    "completed": true
  },
  {
    "userId": 1,
    "id": 9,
    "title": "molestiae perspiciatis ipsa",
    "completed": false
  },
  {
    "userId": 1,
    "id": 10,
    "title": "illo est ratione doloremque quia maiores aut",
    "completed": true
  },
  {
    "userId": 1,
    "id": 11,
    "title": "vero rerum temporibus dolor",
    "completed": true
  },
  {
    "userId": 1,
    "id": 12,
    "title": "ipsa repellendus fugit nisi",
    "completed": true
  },
  {
    "userId": 1,
    "id": 13,
    "title": "et doloremque nulla",
    "completed": false
  },
  {
    "userId": 1,
    "id": 14,
    "title": "repellendus sunt dolores architecto voluptatum",
    "completed": true
  },
  {
    "userId": 1,
    "id": 15,
    "title": "ab voluptatum amet voluptas",
    "completed": true
  },
  {
    "userId": 1,
    "id": 16,
    "title": "accusamus eos facilis sint et aut voluptatem",
    "completed": true
  },
  {
    "userId": 1,
    "id": 17,
    "title": "quo laboriosam deleniti aut qui",
    "completed": true
  },
  {
    "userId": 1,
    "id": 18,
    "title": "dolorum est consequatur ea mollitia in culpa",
    "completed": false
  },
  {
    "userId": 1,
    "id": 19,
    "title": "molestiae ipsa aut voluptatibus pariatur dolor nihil",
    "completed": true
  },
  {
    "userId": 1,
    "id": 20,
    "title": "ullam nobis libero sapiente ad optio sint",
    "completed": true
  }
]

function App() {
  return (
    <Container>
      <Box>
        <Typography variant='h3' component='h1' sx={styles.mainTitle}>
          Todo List
        </Typography>
        <Box sx={styles.list}>
          {columns.map(({ id, title }) => {
            return (
              <Box key={id} sx={styles.column}>
                <Typography variant='h6' component='h2' sx={styles.columnTitle}>
                  {title}
                </Typography>

                <Box sx={styles.columnList}>
                  {tasks.map(({ title }) => {
                    return <Box sx={styles.cart}>{title}</Box>
                  })}
                </Box>
              </Box>
            )
          })}
        </Box>
      </Box>
    </Container>
  )
}

export default App
