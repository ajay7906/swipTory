import React, { useContext, useEffect, useState } from 'react'

import styles from './YourStoryCompo.module.css'
import { getAllUserPost } from '../../api/post';
import AddStory from '../addStory/AddStory';
import BookMarkCompo from '../bookmarkcompo/BookMarkCompo';
import StoryStatus from '../status/StoryStatus';
import { useMediaQuery } from 'react-responsive';
import { AuthContext } from '../../context/authContext';
function YourStoryCompo() {
  const isMobiles = useMediaQuery({ maxWidth: 780 });
  const [allUserStory, setAllUserStory] = useState()
  const [showAddStoryModal, setShowAddStoryModal] = useState(false);
  const [myStoryEdit, setMyStoryEdit] = useState();
  const [showStoryModal, setShowStoryModal] = useState(false)
  const [postId, setPostId] = useState();
  const [itemsToShow, setItemsToShow] = useState(4); // Initial number of items to show
  const [showMoreVisible, setShowMoreVisible] = useState(true);
  
  const openStoryModal = (postId) => {
    setPostId(postId)
    setShowStoryModal(true);

  };
  const closeStoryModal = () => {
    setShowStoryModal(false)
  }

  const closeModal = () => {

    setShowAddStoryModal(false)
  };

  const openshowAddStoryModalModal = (postId) => {
    // setMyStoryId(myStorId)
    setPostId(postId)
    setShowAddStoryModal(true);

  };
  const handleShowMore = () => {
    setItemsToShow(allUserStory?.length); // Show all items
    setShowMoreVisible(false); // Hide the "show more" button
  };

  const fetchAllUserPost = async () => {
    try {
      const result = await getAllUserPost();


      setAllUserStory(result?.stories)
     
    } catch (error) {
      return error
    }

  };
  useEffect(() => {
    fetchAllUserPost()
  }, [])

  if (!allUserStory || allUserStory.length === 0) {
    return null; // If allUserStory is empty or undefined, return null to prevent rendering the component
  }

  return (
    
  <>
    
     
      <div className={styles.mainYourStory}>
      <h2>Your Stories</h2>
      <div className={styles.yourStory}>
        {
          allUserStory &&
          allUserStory.slice(0, itemsToShow)?.map((data, index) => (

            <div key={index} className={styles.commanCard} onClick={() => openStoryModal(data._id)} >< BookMarkCompo index={index} allUserStory={allUserStory} />

              <div onClick={(e) => {
                e.stopPropagation()
                openshowAddStoryModalModal(data._id)

                setMyStoryEdit(allUserStory[index].stories)
              }} className={styles.editBtn}>
                
                <img src="https://swiptory001.netlify.app/static/media/editButton.8b3d5ff3671f9f234629624ceefe1735.svg" alt="edit" />
                <p>edit</p>
              </div>

            </div>

          ))
        }
        

      </div>
      
      {showAddStoryModal && allUserStory &&
        <AddStory closeModal={closeModal}
          myStoryEdit={myStoryEdit}
          postId={postId}
        />}
      <div>
        {showStoryModal && <StoryStatus postId={postId} closeStoryModal={closeStoryModal} />}
      </div>
      {!isMobiles && showMoreVisible && allUserStory.length > 4 &&(
          <div className={styles.showMoreBtnParen}>
            <button onClick={handleShowMore} className={styles.showMoreBtn}>See More</button>
          </div>
        )}
    </div> 


    </>
  )
}

export default YourStoryCompo

