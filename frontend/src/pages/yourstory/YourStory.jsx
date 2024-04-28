// import React from 'react'
// import styles from  './YourStory.module.css'
// import CommanCard from '../../components/commoncard/CommanCard'
// function YourStory() {
//   return (
//     <div className={styles.data}>
//     <div className={styles.htag}><h2>Your Story</h2></div>
//     <div className={styles.main}>
//         <CommanCard />
//         <CommanCard />
//         <CommanCard />
//         <CommanCard />
//     </div>
// </div>
//   )
// }

// export default YourStory




// import React, { useEffect, useState } from 'react'

// import styles from './YourStory.module.css'
// import { getAllUserPost } from '../../api/post';
// import AddStory from '../../components/addStory/AddStory';
// import BookMarkCompo from '../../components/bookmarkcompo/BookMarkCompo';
// import StoryStatus from '../../components/status/StoryStatus';

// function YourStory() {
//   const [allUserStory, setAllUserStory] = useState()
//   const [showAddStoryModal, setShowAddStoryModal] = useState(false);
//   const [myStoryEdit, setMyStoryEdit] = useState();
//   const [showStoryModal, setShowStoryModal] = useState(false)
//   const [postId, setPostId] = useState();
//   const openStoryModal = (postId) => {
//     setPostId(postId)
//     setShowStoryModal(true);

//   };
//   const closeStoryModal = () => {
//     setShowStoryModal(false)
//   }

//   const closeModal = () => {

//     setShowAddStoryModal(false)
//   };

//   const openshowAddStoryModalModal = () => {
//     // setMyStoryId(myStorId)
//     setShowAddStoryModal(true);

//   };

//   const fetchAllUserPost = async () => {
//     try {
//       const result = await getAllUserPost();


//       setAllUserStory(result?.stories)
//       console.log(allUserStory);
//       console.log("Result:", result);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     }

//   };
//   useEffect(() => {
//     fetchAllUserPost()
//   }, [])

//   if (!allUserStory || allUserStory.length === 0) {
//     return null; // If allUserStory is empty or undefined, return null to prevent rendering the component
//   }

//   return (

//     <div className={styles.mainYourStory}>
//       <h2>Your Story</h2>
//       <div className={styles.yourStory}>
//         {
//           allUserStory &&
//           allUserStory?.map((data, index) => (

//             <div key={index} className={styles.commanCard} onClick={() => openStoryModal(data._id)} ><BookMarkCompo allUserStory={allUserStory} />

//               <div onClick={(e) => {
//                 e.stopPropagation()
//                 openshowAddStoryModalModal()
//                 setMyStoryEdit(allUserStory[index].stories)
//               }} className={styles.editBtn}>
//                 {console.log(allUserStory[0].stories)}
//                 <img src="https://swiptory001.netlify.app/static/media/editButton.8b3d5ff3671f9f234629624ceefe1735.svg" alt="edit" />
//                 <p>edit</p>
//               </div>

//             </div>

//           ))
//         } </div>
//       {/* {showAddStoryModal && <AddStory closeModal={closeModal} allUserStory={allUserStory}/>} */}
//       {showAddStoryModal && allUserStory && <AddStory closeModal={closeModal} myStoryEdit={myStoryEdit} />}
//       <div>
//         {showStoryModal && <StoryStatus postId={postId} closeStoryModal={closeStoryModal} />}
//       </div>
//     </div>
//   )
// }

// export default YourStory


import React, { useEffect, useState } from 'react';
import styles from './YourStory.module.css';
import { getAllUserPost } from '../../api/post';
import AddStory from '../../components/addStory/AddStory';
import BookMarkCompo from '../../components/bookmarkcompo/BookMarkCompo';
import StoryStatus from '../../components/status/StoryStatus';
import NoStory from '../../assets/nostory.jpg'
import { Link } from 'react-router-dom';

function YourStory() {
  const [allUserStory, setAllUserStory] = useState();
  const [showAddStoryModal, setShowAddStoryModal] = useState(false);
  const [myStoryEdit, setMyStoryEdit] = useState();
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [postId, setPostId] = useState();

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

  const fetchAllUserPost = async () => {
    try {
      const result = await getAllUserPost();
      setAllUserStory(result?.stories || []); // Set allUserStory to an empty array if result?.stories is falsy
      console.log(allUserStory);
      console.log("Result:", result);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setAllUserStory([]); // Set allUserStory to an empty array if an error occurred
    }
  };

  useEffect(() => {
    fetchAllUserPost();
  }, []);

  return (
    <div className={styles.mainYourStory}>

      {!allUserStory || allUserStory.length === 0 ? (
        // <div>Story not found</div>
        <div className={styles.NoBookMark}>
          <p>Your Story not found</p>
          <img src={NoStory} alt="" />
          <Link to='/' className={styles.backHome}>Back to Home</Link>
        </div>
      ) : (
        <div className={styles.main}>
          {allUserStory.map((data, index) => (
            <div key={index} className={styles.commanCard} onClick={() => openStoryModal(data._id)}>
              <BookMarkCompo allUserStory={allUserStory} />
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  openshowAddStoryModalModal();
                  setMyStoryEdit(allUserStory[index].stories);
                }}
                className={styles.editBtn}
              >
                {console.log(allUserStory[0].stories)}
                <img
                  src="https://swiptory001.netlify.app/static/media/editButton.8b3d5ff3671f9f234629624ceefe1735.svg"
                  alt="edit"
                />
                <p>edit</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {showAddStoryModal && allUserStory && <AddStory closeModal={closeModal} myStoryEdit={myStoryEdit} />}
      <div>{showStoryModal && <StoryStatus postId={postId} closeStoryModal={closeStoryModal} />}</div>
    </div>
  );
}

export default YourStory;