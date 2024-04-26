import React, { useEffect, useState } from 'react'
import styles from './BookMark.module.css'
import CommanCard from '../../components/commoncard/CommanCard'
import { getBookmarkedPosts } from '../../api/post';
import NoBookMark from '../../assets/noBookMark.jpg'
import { Link } from 'react-router-dom';
function BookMark() {
  const [getBookData, setGetBookData] = useState()
  const [showStoryModal, setShowStoryModal] = useState(false)
  const [postId, setPostId] = useState();
  const openStoryModal = (postId) => {
      setPostId(postId)
      setShowStoryModal(true);

  };

  //get bookmark post
  const getBookMarkPost = async () => {


    try {
      const bookmark = await getBookmarkedPosts()
      setGetBookData(bookmark.data)
      console.log(bookmark)
      console.log(getBookData);

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getBookMarkPost()
  }, [])

  return (
    <div className={styles.data}>

      <div className={styles.htag}><h2>Your Bookmarks</h2></div>
      {
        getBookData.length === 0 ? (
          <div className={styles.NoBookMark}>
            <p>BookMark not found</p>
            <img src={NoBookMark} alt="" />
            <Link to='/' className={styles.backHome}>Back to Home</Link>
          </div>

        ) : (
          getBookData.map((data, index) => <CommanCard key={index} data={data} />)

        )
      }

      {/* <div className={styles.bookMarkMain}>
        {getBookData.length === 0 ? (
          <div className={styles.NoBookMark}>
            <p>BookMark not found</p>
            <img src={NoBookMark} alt="" />
          </div>
        ) : (
          getBookData.map((data, index) => <CommanCard key={index} data={data} />)
        )}
      </div> */}

    </div>

  )
}

export default BookMark