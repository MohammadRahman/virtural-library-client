import React, { useEffect, useState } from 'react'
import Grid from '../../components/grid/Grid'
import Modal from '../../components/modal/Modal'
import ListItem from '../list-item/ListItem'
import styles from './Reader.module.scss'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchBooks, updateBookReader } from '../../feature/bookSlice'
import { useNavigate } from 'react-router-dom'

export interface Item {
    _id: string,
    name: string,
    author: any,
    readCounts:number
}
const Reader = () => {

    const [selectedItem, setSelectedItem] = useState<Item | null>(null)
    const navigate = useNavigate()
    
    const dispatch = useAppDispatch()
    const error = useAppSelector(state=> state.error)
    const books = useAppSelector(state => state.books)
    // const user = useAppSelector(state => state.auth.user)
    console.log(books)
    
    const handleClick = (item: Item) => {
        setSelectedItem(item)
        dispatch(updateBookReader(item._id))
    }

    const handleCloseModal = () => {
        setSelectedItem(null)
    }
    
    useEffect(() => {
    dispatch(fetchBooks())
    }, [])
  return (
      <div className={styles.Reader}>
          {books.loading && <p>Loading...</p>}
          {error && (<div style={{
              width: '50%', height: '50%', display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'white',
              color:'red'
          }}><h2>{error.errorMessage}</h2>
              </div>)}
          <Grid container spacing='sm'>
              {books.books.map(list => <ListItem key={list._id} item={list} onClick={()=>handleClick(list)}
              />)}
          </Grid>
          {selectedItem && (
                <Modal onClose={handleCloseModal}>
                    <div className={styles.Details}>
                      <div className={styles.Details_content}>
                          <span className={styles.Details_content_close}>
                             <AiOutlineCloseCircle onClick={handleCloseModal}/> 
                          </span>
                            <span>{selectedItem.name}</span>
                            <span>{selectedItem.author.name}</span>
                        </div>
                    </div>
                </Modal>
            )}
    </div>
  )
}

export default Reader