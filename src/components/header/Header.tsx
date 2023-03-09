import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { logOut, updateAsAuthor } from '../../feature/authSlice'
import CustomButton from '../custom-button/CustomButton'
import styles from './Header.module.scss'


const Header = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const logOutHandler = () => {
    dispatch(logOut())
    navigate('/login')
  }
  const beAnAuthandler = () => {
    dispatch(updateAsAuthor())
    navigate('/author')
  }
  const createBookHandler = () => {
    navigate('/signup')
  }
  const user = useAppSelector(state=> state.auth.user)
  return (
    <div className={styles.Header}>
      <div className={styles.Header_logo}>virtual library</div>
      <div className={styles.Header_options}>
        {user && user.email ? (<>
          <button className={styles.Header_options_option} onClick={logOutHandler} style={{cursor:'pointer'}}>Logout</button>
        </>
        ) :
          (
            <>
              <Link className={styles.Header_options_option} to='/login'>Login</Link>
            </>
          )}
        {user?.role.includes('guest') &&
          <CustomButton name='Be an Author' onClick={beAnAuthandler} />}
        {user?.role.includes('author')&& <CustomButton name='write a book' onClick={createBookHandler} />}
      </div>
    </div>
  )
}

export default Header