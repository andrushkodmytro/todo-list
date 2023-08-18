import { Box, Typography, Avatar, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

const styles = {
  cart: {
    padding: '8px 16px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    minHeight: '80px',
  },
  cartTitle: {
    marginBottom: '8px',
  },
  cartContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  estimation: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    backgroundColor: '#dee0e7',
    borderRadius: '50%',
    width: '28px',
    height: '28px',
  },
}

const Card = ({ todo, onDragStart, onOpenDeleteDialog }) => {
  return (
    <Box
      key={todo.id}
      sx={styles.cart}
      draggable
      onDragStart={(e) => onDragStart(e, todo)}
    >
      <Typography sx={styles.cartTitle}>{todo.title}</Typography>
      {todo.status === 'IN_PROGRESS' && (
        <IconButton onClick={() => onOpenDeleteDialog(todo)}>
          <DeleteIcon />
        </IconButton>
      )}

      <Box sx={styles.cartContent}>
        <Typography>{`BEL-${todo.id}`}</Typography>
        <Box sx={styles.estimation}>12</Box>
        <Avatar alt={todo.imgUrl} src={todo.imgUrl} />
      </Box>
    </Box>
  )
}

export default Card
