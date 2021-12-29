import './OrderDialog.scss'
import { FC, forwardRef, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import { useCart } from '../../hook/cart'
import BurgerPreview from './BurgerPreview/BurgerPreview'
import { useUser } from '../../hook/user'
import { useNavigate } from 'react-router-dom'

interface Props {
  isOrder: boolean
  setIsOrder: any
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const OrderDialog: FC<Props> = (props) => {
  const { user } = useUser()
  const { item, add, remove, submit, calculateTotalPrice } = useCart()
  const navigate = useNavigate()

  const handleClose = () => props.setIsOrder(false)
  const handleClickSubmit = () => submit(item, user.id)

  return (
    <div>
      <Dialog fullScreen open={props.isOrder} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar
            sx={{ backgroundColor: 'var(--header-bg-color)', borderBottom: '3px solid var(--header-border-color)' }}
          >
            <Typography sx={{ flex: 1 }} variant="h6" component="div">
              Заказ
            </Typography>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List>
          <div>
            {item.map((val, key) => {
              return <BurgerPreview key={val.count + '-' + key} cart={val} />
            })}
            {item.length > 0 && (
              <div className="order-dialog">
                <p>
                  К оплате <span>{calculateTotalPrice()}</span>
                </p>
                <button onClick={handleClickSubmit} className="order-dialog-button">
                  Заказать
                </button>
              </div>
            )}
          </div>
        </List>
      </Dialog>
    </div>
  )
}

export default OrderDialog
