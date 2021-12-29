import './BurgerAdd.scss'
import { FC, useState } from 'react'

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Custom Hooks

// Utils
import TextField from '@mui/material/TextField'
import { Burger } from '../../../types/store/restaurant'
import Switch from '@mui/material/Switch'
import { FormControlLabel } from '@mui/material'
import { useBurger } from '../../../hook/restaurant'

// Interface
interface Props {
  restaurantId: number
}

// Component
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const BurgerAdd: FC<Props> = (props) => {
  const { create } = useBurger()

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [desc, setDesc] = useState('')
  const [img, setImg] = useState('')
  const [status, setStatus] = useState(true)

  const handleChangeName = (event: any) => setName(event.target.value)
  const handleChangePrice = (event: any) => setPrice(event.target.value)
  const handleChangeDesc = (event: any) => setDesc(event.target.value)
  const handleChangeImg = (event: any) => setImg(event.target.value)
  const handleChangeStatus = (event: any) => {
    setStatus(event.target.checked)
  }

  const handleClickAdd = (event: any) => {
    event.preventDefault()

    create({
      name,
      price: +price,
      desc,
      img,
      status: +status,
      restaurantId: props.restaurantId,
    })
  }

  return (
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
              <button className="submit-update" onClick={handleClickAdd}>
                Добавить
              </button>
            </div>
          </div>
        </form>
        <div className="burger-edit-image">
          <img src={img} />
        </div>
      </div>
    </div>
  )
}

export default BurgerAdd
