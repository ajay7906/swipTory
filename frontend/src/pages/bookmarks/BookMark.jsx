import React from 'react'
import styles from  './BookMark.module.css'
import CommanCard from '../../components/commoncard/CommanCard'
function BookMark() {
  return (
    <div className={styles.data}>
    <div className={styles.htag}><h2>Your Bookmarks</h2></div>
    <div className={styles.main}>
        <CommanCard />
        <CommanCard />
        <CommanCard />
        <CommanCard />
    </div>
</div>
  )
}

export default BookMark