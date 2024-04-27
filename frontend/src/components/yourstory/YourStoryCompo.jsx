import React, { useEffect, useState } from 'react'
import CommanCard from '../commoncard/CommanCard'
import styles from './YourStoryCompo.module.css'
import { getAllUserPost } from '../../api/post';
import AddStory from '../addStory/AddStory';
import BookMarkCompo from '../bookmarkcompo/BookMarkCompo';
import StoryStatus from '../status/StoryStatus';

function YourStory() {
  const [allUserStory, setAllUserStory] = useState()
  const [showAddStoryModal, setShowAddStoryModal] = useState(false);
  const [myStoryEdit, setMyStoryEdit] = useState();
  const [showStoryModal, setShowStoryModal] = useState(false)
  const [postId, setPostId] = useState();
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

  const openshowAddStoryModalModal = () => {
    // setMyStoryId(myStorId)
    setShowAddStoryModal(true);

  };

  const fetchAllUserPost = async () => {
    try {
      const result = await getAllUserPost();


      setAllUserStory(result?.stories)
      console.log(allUserStory);
      console.log("Result:", result);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }

  };
  useEffect(() => {
    fetchAllUserPost()
  }, [])

  if (!allUserStory || allUserStory.length === 0) {
    return null; // If allUserStory is empty or undefined, return null to prevent rendering the component
  }

  return (

    <div className={styles.mainYourStory}>
      <h2>Your Story</h2>
      <div className={styles.yourStory}>
        {
          allUserStory &&
          allUserStory?.map((data, index) => (

            <div key={index} className={styles.commanCard} onClick={() => openStoryModal(data._id)} ><BookMarkCompo allUserStory={allUserStory} />

              <div onClick={(e) => {
                e.stopPropagation()
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
      <div>
        {showStoryModal && <StoryStatus postId={postId} closeStoryModal={closeStoryModal} />}
      </div>
    </div>
  )
}

export default YourStory


// import React, { useEffect, useState } from 'react';
// import CommanCard from '../commoncard/CommanCard';
// import styles from './YourStory.module.css';
// import { getAllUserPost } from '../../api/post';
// import AddStory from '../addStory/AddStory';
// import BookMarkCompo from '../bookmarkcompo/BookMarkCompo';
// import StoryStatus from '../status/StoryStatus';

// function YourStory() {
//   const [allUserStory, setAllUserStory] = useState();
//   const [showAddStoryModal, setShowAddStoryModal] = useState(false);
//   const [myStoryEdit, setMyStoryEdit] = useState();
//   const [showStoryModal, setShowStoryModal] = useState(false);
//   const [postId, setPostId] = useState();

//   const openStoryModal = (postId) => {
//     setPostId(postId);
//     setShowStoryModal(true);
//   };

//   const closeStoryModal = () => {
//     setShowStoryModal(false);
//   };

//   const closeModal = () => {
//     setShowAddStoryModal(false);
//   };

//   const openshowAddStoryModalModal = () => {
//     setShowAddStoryModal(true);
//   };

//   const fetchAllUserPost = async () => {
//     try {
//       const result = await getAllUserPost();
//       setAllUserStory(result?.stories);
//       console.log(allUserStory);
//       console.log("Result:", result);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAllUserPost();
//   }, []);

//   if (!allUserStory) {
//     return <div className={styles.mainYourStory}>No stories found</div>;
//   }
//  console.log(allUserStory.length === 0);
//   return (
//     <div className={styles.mainYourStory}>
//       <h2>Your Story</h2>
//       {allUserStory.length === 0  ? (
//         <div><h1 style={{color:'red'}}>No stories found</h1></div>
//       ) : (
//         <div className={styles.yourStory}>
//           {allUserStory &&
//             allUserStory?.map((data, index) => (
//               <div key={index} className={styles.commanCard} onClick={() => openStoryModal(data._id)}>
//                 <BookMarkCompo allUserStory={allUserStory} />
//                 <div
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     openshowAddStoryModalModal();
//                     setMyStoryEdit(allUserStory[index].stories);
//                   }}
//                   className={styles.editBtn}
//                 >
//                   {console.log(allUserStory[0].stories)}
//                   <img
//                     src="https://swiptory001.netlify.app/static/media/editButton.8b3d5ff3671f9f234629624ceefe1735.svg"
//                     alt="edit"
//                   />
//                   <p>edit</p>
//                 </div>
//               </div>
//             ))}
//         </div>
//       )}
//       {showAddStoryModal && allUserStory && <AddStory closeModal={closeModal} myStoryEdit={myStoryEdit} />}
//       <div>{showStoryModal && <StoryStatus postId={postId} closeStoryModal={closeStoryModal} />}</div>
//     </div>
//   );
// }

// export default YourStory;