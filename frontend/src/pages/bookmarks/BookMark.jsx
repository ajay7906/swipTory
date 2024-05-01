import React, { useEffect, useState } from 'react'
import styles from './BookMark.module.css'
import CommanCard from '../../components/commoncard/CommanCard'
import { getBookmarkedPosts } from '../../api/post';
import NoBookMark from '../../assets/noBookMark.jpg'
import { Link } from 'react-router-dom';
import BookMarkCompo from '../../components/bookmarkcompo/BookMarkCompo';
import AddStory from '../../components/addStory/AddStory';
import StoryStatus from '../../components/status/StoryStatus';
import { jwtDecode } from 'jwt-decode';
import Loader from '../../components/loader/Loader';
import { useMediaQuery } from 'react-responsive';
function BookMark() {
  const isMobiles = useMediaQuery({ maxWidth: 780 });
  const [getBookData, setGetBookData] = useState()
  const [showStoryModal, setShowStoryModal] = useState(false)
  const [postId, setPostId] = useState();
  const [showAddStoryModal, setShowAddStoryModal] = useState(false);
  const [myStoryEdit, setMyStoryEdit] = useState();
  const [currentUser, setCurrentUser] = useState(null);
  const [itemsToShow, setItemsToShow] = useState(4); // Initial number of items to show
  const [showMoreVisible, setShowMoreVisible] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwtDecode(token);
      setCurrentUser(decodedToken.userId);
    }

  }, []);
  const handleShowMore = () => {
    setItemsToShow(getBookData?.length); // Show all items
    setShowMoreVisible(false); // Hide the "show more" button
  };


  const openStoryModal = (postId) => {
    setPostId(postId);
    setShowStoryModal(true);
  };

  const closeStoryModal = () => {
    setShowStoryModal(false);
  };

  const closeModal = () => {
    setShowAddStoryModal(false);
  };

  const openshowAddStoryModalModal = () => {
    setShowAddStoryModal(true);
  };

  //get bookmark post
  const getBookMarkPost = async () => {


    try {
      const bookmark = await getBookmarkedPosts()
      setGetBookData(bookmark?.data)
      setLoading(false);

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getBookMarkPost()
  }, [])

  return (
    <div className={styles.data}>
      {loading ? ( // Show loader if loading state is true
        <Loader />
      ) : (
        <>
          <div className={styles.htag}><h2>Your Bookmarks</h2></div>
          {
            getBookData?.length === 0 ? (
              <div className={styles.NoBookMark}>
                <p>BookMark not found</p>
                <img src={NoBookMark} alt="" />
                <Link to='/' className={styles.backHome}>Back to Home</Link>
              </div>

            ) : <> <div className={styles.mainCompo}>
              {

                getBookData?.map((data, index) => (
                  <div key={index}>
                    {console.log(data)}
                    <div className={styles.mainEditBtn} onClick={() => { openStoryModal(data._id) }} key={index}><BookMarkCompo data={data} />
                      {currentUser && currentUser === data.postedBy && ( // Check if currentUserId matches postedByUserId
                        <div className={styles.editBtn} onClick={(e) => {
                          e.stopPropagation()
                          openshowAddStoryModalModal()
                          setMyStoryEdit(data.stories)

                        }}>
                          <img src="https://swiptory001.netlify.app/static/media/editButton.8b3d5ff3671f9f234629624ceefe1735.svg" alt="" />
                          <p>edit</p>
                        </div>
                      )}
                    </div>
                  </div>


                ))}






            </div>

              {!isMobiles && showMoreVisible && getBookData.length > 4 &&(
                <div className={styles.showMoreBtnParen}>
                  <button onClick={handleShowMore} className={styles.showMoreBtn}>See More</button>
                </div>
              )}




            </>



          }

          {showAddStoryModal && getBookData && <AddStory postId={postId} closeModal={closeModal} myStoryEdit={myStoryEdit} />}
          <div>{showStoryModal && <StoryStatus postId={postId} closeStoryModal={closeStoryModal} />}</div>
        </>
      )}
    </div>
  )
}

export default BookMark