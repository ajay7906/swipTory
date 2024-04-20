import React from 'react'
import styles from  './YourStory.module.css'
import CommanCard from '../../components/commoncard/CommanCard'
function YourStory() {
  return (
    <div className={styles.data}>
    <div className={styles.htag}><h2>Your Story</h2></div>
    <div className={styles.main}>
        <CommanCard />
        <CommanCard />
        <CommanCard />
        <CommanCard />
    </div>
</div>
  )
}

export default YourStory