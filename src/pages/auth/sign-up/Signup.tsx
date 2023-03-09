import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../app/hooks'
import FormHandler from '../../../components/form-handler/FormHandler'
import { publishBook } from '../../../feature/bookSlice'
import styles from './Signup.module.scss'


const Signup = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const formValues = [
    { name: 'name', label: 'Name', type: 'text' },
    ]

    const newBookPublishHandler = (values:any) => {
        dispatch(publishBook(values))
        setTimeout(() => {
            navigate('/author')
        },2000)
        }
  return (
      <div className={styles.Signup}>
          <div className={styles.Signup_container}>
              <div className={styles.Signup_container_header}><h2>Book</h2></div>
              <div className={styles.Signup_container_body}>
                  <FormHandler fields={formValues} buttonName='publish' onSubmit={newBookPublishHandler} />
              </div>
          </div> 
    </div>
  )
}

export default Signup