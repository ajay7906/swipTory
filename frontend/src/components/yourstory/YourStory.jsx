import React, { useEffect, useState } from 'react'
import CommanCard from '../commoncard/CommanCard'
import styles from './YourStory.module.css'
import { getAllUserPost } from '../../api/post';
import AddStory from '../addStory/AddStory';

function YourStory() {
  const [allUserStory, setAllUserStory] = useState()
  const [showAddStoryModal, setShowAddStoryModal] = useState(false);
  const [myStoryEdit, setMyStoryEdit] = useState();

  const closeModal = () => {

    setShowAddStoryModal(false)
  };

  const openshowAddStoryModalModal = () => {
    // setMyStoryId(myStorId)
    setShowAddStoryModal(true);

  };

  const fetchAllUserPost = async () => {
    try {
      const result = await getAllUserPost();


      setAllUserStory(result.stories)
      console.log(allUserStory);
      console.log("Result:", result);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }

  };
  useEffect(() => {
    fetchAllUserPost()
  }, [])
  
  return (

    <div className={styles.mainYourStory}>
      <h2>Your Story</h2>
      <div className={styles.yourStory}>
        {
          allUserStory &&
          allUserStory?.map((data, index) => (

            <div key={index} className={styles.commanCard} ><CommanCard />  <div onClick={()=>{
              openshowAddStoryModalModal()
              setMyStoryEdit(allUserStory[index].stories)
              }} className={styles.editBtn}>
               {console.log(allUserStory[0].stories)}
              <img src="https://swiptory001.netlify.app/static/media/editButton.8b3d5ff3671f9f234629624ceefe1735.svg" alt="edit" />
              <p>edit</p>
            </div>
           
            </div>

          ))
        } </div>
      {/* {showAddStoryModal && <AddStory closeModal={closeModal} allUserStory={allUserStory}/>} */}
      {showAddStoryModal && allUserStory && <AddStory closeModal={closeModal} myStoryEdit={myStoryEdit} />}

    </div>
  )
}

export default YourStory