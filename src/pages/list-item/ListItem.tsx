import React, { ReactNode } from 'react'
import { useAppSelector } from '../../app/hooks'
import CustomButton from '../../components/custom-button/CustomButton'
import Grid from '../../components/grid/Grid'
import styles from './ListItem.module.scss'

type Item={
  _id: string,
  name: string,
  author: any,
  readCounts:number
  }
interface ListItem{
  item: Item
  onClick: (item: Item) => void
}
const ListItem = ({ item, onClick }: ListItem) => {
  
  const user = useAppSelector(state=> state.auth.user)
    return (
        <Grid item xs={6} sm={6} md={3} lg={3}>
          <div className={styles.Item} >
          <span className={styles.Item_title}>{item.name}</span>
          <div className={styles.Item_bottom}>
            {user?.role.includes('author') ? (<>
              <span className={styles.Item_bottom_author_name}>Total Reads: {item.readCounts}</span>
               <CustomButton name='details' onClick={()=>onClick(item)}/>
            </>) : (<>
                <span className={styles.Item_bottom_author_name}>Author: {item.author.name}</span>
                <CustomButton name='read more' onClick={()=>onClick(item)}/>
           </>)}
          
          </div>
        </div>
          
    </Grid>
  )
}

export default ListItem