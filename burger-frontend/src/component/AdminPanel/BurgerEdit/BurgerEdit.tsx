import './BurgerEdit.scss'
import { FC, Fragment, useState } from 'react'

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Custom Hooks

// Utils
import TextField from '@mui/material/TextField'
import { Burger } from '../../../types/store/restaurant'
import Switch from '@mui/material/Switch'
import { FormControlLabel } from '@mui/material'
import { useBurger } from '../../../hook/restaurant/useBurger'

// Interface
interface Props {
  burger: Burger
}

// Component
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const BurgerEdit: FC<Props> = (props) => {
  const { update, remove, burger } = useBurger()

  const [name, setName] = useState(props.burger.name)
  const [price, setPrice] = useState(props.burger.price)
  const [desc, setDesc] = useState(props.burger.desc)
  const [img, setImg] = useState(props.burger.img)
  const [status, setStatus] = useState(Boolean(props.burger.status))

  const handleChangeName = (event: any) => setName(event.target.value)
  const handleChangePrice = (event: any) => setPrice(event.target.value)
  const handleChangeDesc = (event: any) => setDesc(event.target.value)
  const handleChangeImg = (event: any) => setImg(event.target.value)
  const handleChangeStatus = (event: any) => {
    setStatus(event.target.checked)
  }

  const handleClickUpdate = (event: any) => {
    event.preventDefault()
    update({
      id: props.burger.id,
      name,
      price: +price,
      desc,
      img,
      status: +status,
      restaurantId: props.burger.restaurantId,
    })
  }

  const handleClickRemove = (event: any) => {
    event.preventDefault()
    remove(props.burger.id, burger.burgers)
  }

  return (
    <Fragment>
      {/* <hr className="burger-edit-hr" /> */}
      <div className="burger-edit">
        <div className="burger-edit-content">
          <form className="burger-edit-form">
            <div>
              <TextField label="Название" variant="outlined" value={name} onChange={handleChangeName} />
              <TextField type="number" label="Цена" variant="outlined" value={price} onChange={handleChangePrice} />
            </div>
            <TextField
              id="outlined-multiline-flexible"
              label="Описание"
              multiline
              maxRows={4}
              value={desc}
              onChange={handleChangeDesc}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Сылка на картинку"
              multiline
              maxRows={4}
              value={img}
              onChange={handleChangeImg}
            />

            <div className="burger-edit-submit">
              <FormControlLabel
                control={
                  <Switch checked={status} onChange={handleChangeStatus} inputProps={{ 'aria-label': 'controlled' }} />
                }
                label="Доступно"
              />
              <div className="burger-edit-submit__buttons">
                <button className="submit-update" onClick={handleClickUpdate}>
                  Обновить
                </button>
                <button className="submit-remove" onClick={handleClickRemove}>
                  Удалить
                </button>
              </div>
            </div>
          </form>
          <div className="burger-edit-image">
            <img src={img} />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default BurgerEdit
