// import React, { useContext, useEffect, useState } from 'react'

// import styles from './YourStoryCompo.module.css'
// import { getAllUserPost } from '../../api/post';
// import AddStory from '../addStory/AddStory';
// import BookMarkCompo from '../bookmarkcompo/BookMarkCompo';
// import StoryStatus from '../status/StoryStatus';
// import { useMediaQuery } from 'react-responsive';
// import { AuthContext } from '../../context/authContext';
// function YourStoryCompo() {
//   const isMobiles = useMediaQuery({ maxWidth: 780 });
//   const [allUserStory, setAllUserStory] = useState()
//   const [showAddStoryModal, setShowAddStoryModal] = useState(false);
//   const [myStoryEdit, setMyStoryEdit] = useState();
//   const [showStoryModal, setShowStoryModal] = useState(false)
//   const [postId, setPostId] = useState();
//   const [itemsToShow, setItemsToShow] = useState(4); // Initial number of items to show
//   const [showMoreVisible, setShowMoreVisible] = useState(true);
  
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

//   const openshowAddStoryModalModal = (postId) => {
//     // setMyStoryId(myStorId)
//     setPostId(postId)
//     setShowAddStoryModal(true);

//   };
//   const handleShowMore = () => {
//     setItemsToShow(allUserStory?.length); // Show all items
//     setShowMoreVisible(false); // Hide the "show more" button
//   };

//   const fetchAllUserPost = async () => {
//     try {
//       const result = await getAllUserPost();


//       setAllUserStory(result?.stories)
     
//     } catch (error) {
//       return error
//     }

//   };
//   useEffect(() => {
//     fetchAllUserPost()
//   }, [])

//   if (!allUserStory || allUserStory.length === 0) {
//     return null; // If allUserStory is empty or undefined, return null to prevent rendering the component
//   }

//   return (
    
//   <>
    
     
//       <div className={styles.mainYourStory}>
//       <h2>Your Stories</h2>
//       <div className={styles.yourStory}>
//         {
//           allUserStory &&
//           allUserStory.slice(0, itemsToShow)?.map((data, index) => (

//             <div key={index} className={styles.commanCard} onClick={() => openStoryModal(data._id)} >< BookMarkCompo index={index} allUserStory={allUserStory} />

//               <div onClick={(e) => {
//                 e.stopPropagation()
//                 openshowAddStoryModalModal(data._id)

//                 setMyStoryEdit(allUserStory[index].stories)
//               }} className={styles.editBtn}>
                
//                 <img src="https://swiptory001.netlify.app/static/media/editButton.8b3d5ff3671f9f234629624ceefe1735.svg" alt="edit" />
//                 <p>edit</p>
//               </div>

//             </div>

//           ))
//         }
        

//       </div>
      
//       {showAddStoryModal && allUserStory &&
//         <AddStory closeModal={closeModal}
//           myStoryEdit={myStoryEdit}
//           postId={postId}
//         />}
//       <div>
//         {showStoryModal && <StoryStatus postId={postId} closeStoryModal={closeStoryModal} />}
//       </div>
//       {!isMobiles && showMoreVisible && allUserStory.length > 4 &&(
//           <div className={styles.showMoreBtnParen}>
//             <button onClick={handleShowMore} className={styles.showMoreBtn}>See More</button>
//           </div>
//         )}
//     </div> 


//     </>
//   )
// }

// export default YourStoryCompo








import React, { useEffect, useState } from 'react';
import { getAllUserPost } from '../../api/post';
import AddStory from '../addStory/AddStory';
import BookMarkCompo from '../bookmarkcompo/BookMarkCompo';
import StoryStatus from '../status/StoryStatus';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';

function YourStoryCompo() {
  const isMobile = useMediaQuery({ maxWidth: 780 });
  const [allUserStory, setAllUserStory] = useState([]);
  const [showAddStoryModal, setShowAddStoryModal] = useState(false);
  const [myStoryEdit, setMyStoryEdit] = useState(null);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [postId, setPostId] = useState(null);
  const [itemsToShow, setItemsToShow] = useState(4);
  const [showMoreVisible, setShowMoreVisible] = useState(true);

  const openStoryModal = (postId) => {
    setPostId(postId);
    setShowStoryModal(true);
  };

  const closeStoryModal = () => {
    setShowStoryModal(false);
    setPostId(null);
  };

  const closeModal = () => {
    setShowAddStoryModal(false);
    setPostId(null);
    setMyStoryEdit(null);
  };

  const openAddStoryModal = (postId, index) => {
    setPostId(postId);
    setMyStoryEdit(allUserStory[index]?.stories || null);
    setShowAddStoryModal(true);
  };

  const handleShowMore = () => {
    setItemsToShow(allUserStory.length);
    setShowMoreVisible(false);
  };

  const fetchAllUserPost = async () => {
    try {
      const result = await getAllUserPost();
      setAllUserStory(result?.stories || []);
      setShowMoreVisible(result?.stories?.length > 4);
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };

  useEffect(() => {
    fetchAllUserPost();
  }, []);

  // If there are no stories
  if (!allUserStory || allUserStory.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12 mt-16">
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-3xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12 flex flex-col items-center text-center">
            <div className="mb-6">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-indigo-600 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Your Story Journey Begins Here
            </h2>
            <p className="text-gray-600 max-w-lg mb-8">
              You haven't created any stories yet. Start your storytelling journey and share your experiences with the world.
            </p>
            <Link
              to="/addstory"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Create Your First Story
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12 mt-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Your Stories
            </h2>
            <div className="flex items-center">
              <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full"></div>
              <div className="w-8 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full ml-1"></div>
              <div className="w-4 h-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full ml-1"></div>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-full text-sm font-medium text-gray-700">
              <span className="mr-2">{allUserStory.length} stories</span>
              <span className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-full px-2 py-1">
                {Math.round(
                  (allUserStory.filter((story) => story.status === 'published').length / allUserStory.length) * 100 || 0
                )}% published
              </span>
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allUserStory.slice(0, itemsToShow).map((data, index) => (
            <div
              key={data._id || index} // Use _id for unique key
              className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              onClick={() => openStoryModal(data._id)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
              <div className="absolute top-4 right-4 z-20">
                <BookMarkCompo index={index} allUserStory={allUserStory} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
                <h3 className="text-xl font-bold text-white mb-1 truncate">{data.title || 'Untitled'}</h3>
                <div className="flex items-center text-sm text-gray-200">
                  <span
                    className={`inline-block w-3 h-3 rounded-full mr-2 ${
                      data.status === 'published' ? 'bg-green-400' : 'bg-yellow-400'
                    }`}
                  ></span>
                  {data.status ? data.status.charAt(0).toUpperCase() + data.status.slice(1) : 'Draft'}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openAddStoryModal(data._id, index);
                }}
                className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-all duration-300 transform group-hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <div className="relative h-60">
                {data.image && data.image.trim() ? (
                  <img
                    src={data.image}
                    alt={data.title || 'Story Image'}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.style.display = 'none'; // Hide broken image
                      e.target.nextSibling.style.display = 'flex'; // Show fallback
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-purple-400 to-indigo-600 flex items-center justify-center">
                    <div className="text-white text-4xl font-bold">
                      {data.title?.charAt(0) || 'S'}
                    </div>
                  </div>
                )}
                <div
                  className="w-full h-full bg-gradient-to-r from-purple-400 to-indigo-600 flex items-center justify-center"
                  style={{ display: 'none' }}
                >
                  <div className="text-white text-4xl font-bold">{data.title?.charAt(0) || 'S'}</div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-200 z-30">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-teal-500"
                  style={{ width: `${Math.random() * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        {!isMobile && showMoreVisible && allUserStory.length > 4 && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleShowMore}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-medium rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
                />
              </svg>
              Show More Stories
            </button>
          </div>
        )}
      </div>
      {showAddStoryModal && (
        <AddStory closeModal={closeModal} myStoryEdit={myStoryEdit} postId={postId} />
      )}
      {showStoryModal && <StoryStatus postId={postId} closeStoryModal={closeStoryModal} />}
    </>
  );
}

export default YourStoryCompo;