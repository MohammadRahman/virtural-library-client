import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Item } from '../reader/Reader'
import styles from './Author.module.scss'
import {getMyBooks} from '../../feature/bookSlice'
import Grid from '../../components/grid/Grid'
import ListItem from '../list-item/ListItem'
import Modal from '../../components/modal/Modal'
import { AiOutlineCloseCircle } from 'react-icons/ai'

const Author = () => {
      const [selectedItem, setSelectedItem] = useState<Item | null>(null)

    const dispatch = useAppDispatch()
    const books = useAppSelector(state => state.books)

    console.log("books from author state",books.authorBooks)

     const handleClick = (item: Item) => {
        setSelectedItem(item)
        // dispatch(updateBookReader(item._id))
    }

    const handleCloseModal = () => {
        setSelectedItem(null)
    }

     useEffect(() => {
            dispatch(getMyBooks())
     }, [])
    
  return (
      <div className={styles.Author}>
          {books.loading && <p>Loading...</p>}
          <Grid container spacing='sm'>
              {/* {books.authorBooks?.length === 0 ? (<div
                  style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><h2>You have not write any book yet</h2></div>) :
                  (
                      <>
                      {books.authorBooks.map((list: Item) => <ListItem key={list._id} item={list} onClick={()=>handleClick(list)}
              />)}
                      </>
                  )} */}
              {books.authorBooks.map((list: Item) => <ListItem key={list._id} item={list} onClick={()=>handleClick(list)}
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

export default Author