import { useEffect } from 'react'
import styles from './Signin.module.scss'
import { useForm } from 'react-hook-form';
import CustomButton from '../../../components/custom-button/CustomButton';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { loginWithEmailAndPassword } from '../../../feature/authSlice';
import { useNavigate } from 'react-router-dom';
import errorSlice from '../../../feature/errorSlice';
import FormHandler from '../../../components/form-handler/FormHandler';
import UserCreds from '../../../components/user-creds/UserCreds';
import axios from 'axios';


const Signin = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const error = useAppSelector(state => state.error.errorMessage)


    const submitHandler = (values: any) => {
     
      dispatch(loginWithEmailAndPassword({navigate, ...values}))
    }
  
  const formValues = [
    { name: 'email', label: 'Email', type: 'email' },
  { name: 'password', label: 'Password', type: 'password' },
  ]

  return (
      <div className={styles.Login}>
          <div className={styles.Login_form}>
        <div className={styles.Login_form_header}><h2>Log In</h2></div>
        <div className={styles.Login_form_inputs}>
          {error && <div className={styles.Login_form_inputs_errors}><p>{error}</p></div>}
          <FormHandler fields={formValues} onSubmit={submitHandler} buttonName='login' />
              </div>    
          </div>
    </div>
  )
}

export default Signin