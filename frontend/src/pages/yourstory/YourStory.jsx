


import React, { useEffect, useState } from 'react';
import styles from './YourStory.module.css';
import { getAllUserPost } from '../../api/post';
import AddStory from '../../components/addStory/AddStory';
import BookMarkCompo from '../../components/bookmarkcompo/BookMarkCompo';
import StoryStatus from '../../components/status/StoryStatus';
import NoStory from '../../assets/nostory.jpg'
import { Link , useNavigate} from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import { useMediaQuery } from 'react-responsive';
import { Navigate } from 'react-router-dom';

function YourStory() {
  const isMobiles = useMediaQuery({ maxWidth: 780 });
  const [allUserStory, setAllUserStory] = useState();
  const [showAddStoryModal, setShowAddStoryModal] = useState(false);
  const [myStoryEdit, setMyStoryEdit] = useState();
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [postId, setPostId] = useState();
  const [loading, setLoading] = useState(true);
  const [showMoreVisible, setShowMoreVisible] = useState(true);
  const [itemsToShow, setItemsToShow] = useState(4); 
  const navigate = useNavigate()
 
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
  const handleShowMore = () => {
    setItemsToShow(allUserStory?.length); // Show all items
    setShowMoreVisible(false); // Hide the "show more" button
  };
  
  const fetchAllUserPost = async () => {
    try {
      const result = await getAllUserPost();
      setAllUserStory(result?.stories || []); 
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setAllUserStory([]); 
    }
  };
  console.log(allUserStory);
  useEffect(() => {
    fetchAllUserPost();
  }, []);
  
  if (!isMobiles) {
    return <Navigate to='/' replace/>;
  }

  return (
    <>
    <div className={styles.mainYourStory}>
    <h2>Your Story</h2>
      {
        loading ? 
        (
        <Loader/> 
      )
         : <>
         {!allUserStory || allUserStory.length === 0 ? (
         
          <div className={styles.NoBookMark}>
            <p>Your Story not found</p>
            <img src={NoStory} alt="" />
            <Link to='/' className={styles.backHome}>Back to Home</Link>
          </div>
        ) : (
          <div className={styles.main}>
            {allUserStory.map((data, index) => (
              <div key={index} className={styles.commanCard} onClick={() => openStoryModal(data._id)}>
                <BookMarkCompo allUserStory={allUserStory} index={index}/>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    openshowAddStoryModalModal();
                    setMyStoryEdit(allUserStory[index].stories);
                  }}
                  className={styles.editBtn}
                >
                 
                  <img
                    src="https://swiptory001.netlify.app/static/media/editButton.8b3d5ff3671f9f234629624ceefe1735.svg"
                    alt="edit"
                  />
                  <p>edit</p>
                </div>
              </div>
            ))}
          </div>
        )}  </>
      
      }
       {!isMobiles && showMoreVisible && allUserStory.length > 4 &&(
          <div className={styles.showMoreBtnParen}>
            <button onClick={handleShowMore} className={styles.showMoreBtn}>See More</button>
          </div>
        )}
      
      {showAddStoryModal && allUserStory && <AddStory postId={postId} closeModal={closeModal} myStoryEdit={myStoryEdit} />}
      <div>{showStoryModal && <StoryStatus postId={postId} closeStoryModal={closeStoryModal} />}</div>
    </div> 

    </>
  );
}

export default YourStory;