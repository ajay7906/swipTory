



// import CommanCard from "../commoncard/CommanCard";
// import StoryStatus from "../status/StoryStatus";
// import styles from './MainCompo.module.css';
// import React, { useEffect, useState } from "react";

// import AddStory from "../addStory/AddStory";


// import { jwtDecode } from 'jwt-decode';

// import useMediaQuery from "../../utils/screenSize";

// function MainCompo({ sendData, allData }) {
//     const [showStoryModal, setShowStoryModal] = useState(false)

//     const [myStoryHomeEdits, setMyStoryHomeEdits] = useState();
//     const [currentUser, setCurrentUser] = useState(null);
//     const [showAddStoryModals, setShowAddStoryModals] = useState(false);
//     const [postId, setPostId] = useState();
 
//     const [itemsToShowWithCat, setItemsToShowWithCat] = useState(4);
//     const [showMoreVisible, setShowMoreVisible] = useState(true);
//     const [showMoreVisibleWithCat, setShowMoreVisibleWithCat] = useState(true);
//     const [categoryItemsToShow, setCategoryItemsToShow] = useState({});
//     const isMobile = useMediaQuery('(max-width: 780px)');
//     let categoryMap = ['Education', 'Sports', 'Fruits', 'World', 'India'];
//     useEffect(() => {
//         const token = localStorage.getItem('token');

//         if (token) {
//             const decodedToken = jwtDecode(token);
//             setCurrentUser(decodedToken.userId);
//         }

//     }, []);
//     useEffect(() => {

//     }, [isMobile])


//     const closeModal = () => {

//         setShowAddStoryModals(false)
//     };

//     const openshowAddStoryModalModal = () => {

//         setShowAddStoryModals(true);

//     };





//     const handleShowMore = (categoryName) => {
//         const categoryItemCount = sendData.filter((item) => item.chooseCategory === categoryName).length;
//         setCategoryItemsToShow((prevState) => ({
//             ...prevState,
//             [categoryName]: sendData.filter((item) => item.chooseCategory === categoryName).length,
//         }));
//         setShowMoreVisible(categoryItemCount > 4)
//     };

//     const handleShowMoreWithCategory = () => {
//         setShowMoreVisibleWithCat(false)
//         setItemsToShowWithCat(sendData.length)

//     }

//     if (!Array.isArray(sendData)) {
//         return null;
//     }




//     const openStoryModal = (postId) => {
//         setPostId(postId)
//         setShowStoryModal(true);

//     };
//     const closeStoryModal = () => {
//         setShowStoryModal(false)
//     }



//     return (
//         <>


//             <div className={styles.data}>
//                 {!isMobile &&
//                     allData === "All" ?
//                     <> {categoryMap.map((categoryName, index) => (
//                         <div key={index}>

//                             <div className={styles.htag}><h2>Top Stories About {categoryName}</h2></div>

//                             {sendData
//                                 .filter((categoryData) => categoryData.chooseCategory === categoryName)
//                                 .length > 0 ? (<>
//                                     <div className={styles.main}>
//                                         {sendData
//                                             .filter((categoryData) => categoryData.chooseCategory === categoryName)
//                                             .slice(0, categoryItemsToShow[categoryName] || 4).map((filteredData, index) => (

//                                                 <div className={styles.CommanCardMain} key={index} onClick={() => openStoryModal(filteredData._id)}>


//                                                     <CommanCard filteredData={filteredData} />
//                                                     {currentUser && currentUser === filteredData.postedBy && ( // Check if currentUserId matches postedByUserId
//                                                         <div className={styles.editBtn} onClick={(e) => {
//                                                             e.stopPropagation()
//                                                             openshowAddStoryModalModal()
//                                                             setMyStoryHomeEdits(filteredData.stories)

//                                                         }}>
//                                                             <img src="https://swiptory001.netlify.app/static/media/editButton.8b3d5ff3671f9f234629624ceefe1735.svg" alt="" />
//                                                             <p>edit</p>
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             ))}
//                                     </div>

//                                     {showMoreVisible && !categoryItemsToShow[categoryName]  && sendData.filter((item) => item.chooseCategory === categoryName).length > 4 &&( // Show the button only if categoryItemsToShow doesn't have a value for the current category
//                                         <div className={styles.showMoreBtnParen}>
//                                             <button onClick={() => handleShowMore(categoryName)} className={styles.showMoreBtn}>
//                                                 See More
//                                             </button>
//                                         </div>
//                                     )}
//                                 </>
//                             ) : (
//                                 <div className={styles.storyNotFound}><h3>No stories Available</h3></div>
//                             )}



//                         </div>
//                     ))}</>
//                     :
//                     <>
//                         <div >
//                             {isMobile ? <> </> :
//                                 <> <div className={styles.htag}><h2>Top Stories About {allData}</h2></div></>
//                             }



                        

//                             {
//                                 sendData.length > 0 ? (
//                                     <>
//                                         <div className={styles.main}>
//                                             {sendData.slice(0, itemsToShowWithCat).map((filteredData, index) => (
//                                                 <div key={index} className={styles.CommanCardMain} onClick={() => openStoryModal(filteredData._id)}>

//                                                     <CommanCard filteredData={filteredData} />
//                                                     {currentUser && currentUser === filteredData.postedBy && ( // Check if currentUserId matches postedByUserId
//                                                         <div className={styles.editBtn} onClick={(e) => {
//                                                             e.stopPropagation()
//                                                             openshowAddStoryModalModal()
//                                                             setMyStoryHomeEdits(filteredData.stories)

//                                                         }}>
//                                                             <img src="https://swiptory001.netlify.app/static/media/editButton.8b3d5ff3671f9f234629624ceefe1735.svg" alt="" />
//                                                             <p>edit</p>
//                                                         </div>
//                                                     )}
//                                                 </div>

//                                             ))}

//                                         </div>
//                                         {!isMobile && showMoreVisibleWithCat && sendData.length > 4 && (
//                                             <div className={styles.showMoreBtnParen}>
//                                                 <button onClick={handleShowMoreWithCategory} className={styles.showMoreBtn}>See More</button>
//                                             </div>
//                                         )}
//                                     </>




//                                 ) : (

//                                     <div className={styles.storyNotFound}><h3>No stories Available</h3></div>
//                                 )


//                             }  
//                         </div>
//                     </>
//                 }
//                 <div>
//                     {showAddStoryModals && myStoryHomeEdits && <AddStory
//                         closeModal={closeModal}
//                         myStoryHomeEdits={myStoryHomeEdits}
//                         postId={postId}
//                     />}
//                     {showStoryModal && <StoryStatus postId={postId} closeStoryModal={closeStoryModal} />}
//                 </div>
//             </div>
//         </>
//     );
// }

// export default MainCompo;








import React, { useEffect, useState } from "react";
import CommanCard from "../commoncard/CommanCard";
import StoryStatus from "../status/StoryStatus";
import AddStory from "../addStory/AddStory";
import { jwtDecode } from 'jwt-decode';
import useMediaQuery from "../../utils/screenSize";

function MainCompo({ sendData, allData }) {
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [myStoryHomeEdits, setMyStoryHomeEdits] = useState();
  const [currentUser, setCurrentUser] = useState(null);
  const [showAddStoryModals, setShowAddStoryModals] = useState(false);
  const [postId, setPostId] = useState();
  const [itemsToShowWithCat, setItemsToShowWithCat] = useState(4);
  const [showMoreVisible, setShowMoreVisible] = useState(true);
  const [showMoreVisibleWithCat, setShowMoreVisibleWithCat] = useState(true);
  const [categoryItemsToShow, setCategoryItemsToShow] = useState({});
  const isMobile = useMediaQuery('(max-width: 780px)');
  
  const categoryMap = ['Education', 'Sports', 'Fruits', 'World', 'India'];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setCurrentUser(decodedToken.userId);
    }
  }, []);

  const closeModal = () => setShowAddStoryModals(false);
  const openshowAddStoryModalModal = () => setShowAddStoryModals(true);

  const handleShowMore = (categoryName) => {
    const categoryItemCount = sendData.filter((item) => item.chooseCategory === categoryName).length;
    setCategoryItemsToShow((prevState) => ({
      ...prevState,
      [categoryName]: categoryItemCount,
    }));
    setShowMoreVisible(categoryItemCount > 4);
  };

  const handleShowMoreWithCategory = () => {
    setShowMoreVisibleWithCat(false);
    setItemsToShowWithCat(sendData.length);
  };

  const openStoryModal = (postId) => {
    setPostId(postId);
    setShowStoryModal(true);
  };

  const closeStoryModal = () => setShowStoryModal(false);

  if (!Array.isArray(sendData)) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      {!isMobile && allData === "All" ? (
        <>
          {categoryMap.map((categoryName, index) => {
            const categoryStories = sendData.filter(
              (categoryData) => categoryData.chooseCategory === categoryName
            );
            
            return (
              <div key={index} className="mb-16">
                {/* Category Header */}
                <div className="flex items-center mb-8">
                  <div className="mr-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                      Top Stories About {categoryName}
                    </h2>
                    <div className="flex mt-2">
                      <div className="w-12 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
                      <div className="w-8 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full ml-1"></div>
                      <div className="w-4 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full ml-1"></div>
                    </div>
                  </div>
                  <div className="ml-auto bg-gray-100 px-4 py-2 rounded-full text-sm font-medium">
                    <span className="text-gray-700">{categoryStories.length} stories</span>
                  </div>
                </div>

                {categoryStories.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {categoryStories
                        .slice(0, categoryItemsToShow[categoryName] || 4)
                        .map((filteredData, index) => (
                          <div 
                            key={index} 
                            className="relative group"
                            onClick={() => openStoryModal(filteredData._id)}
                          >
                            <CommanCard filteredData={filteredData} />
                            
                            {currentUser && currentUser === filteredData.postedBy && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openshowAddStoryModalModal();
                                  setMyStoryHomeEdits(filteredData.stories);
                                }}
                                className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-all duration-300 transform group-hover:scale-110"
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
                            )}
                          </div>
                        ))}
                    </div>

                    {showMoreVisible && !categoryItemsToShow[categoryName] && categoryStories.length > 4 && (
                      <div className="flex justify-center mt-10">
                        <button 
                          onClick={() => handleShowMore(categoryName)}
                          className="flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
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
                  </>
                ) : (
                  <div className="text-center py-16 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl">
                    <div className="inline-block bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mb-4"></div>
                    <h3 className="text-xl font-medium text-gray-600">No stories available for {categoryName}</h3>
                  </div>
                )}
              </div>
            );
          })}
        </>
      ) : (
        <>
          {!isMobile && (
            <div className="flex items-center mb-8">
              <div className="mr-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Top Stories About {allData}
                </h2>
                <div className="flex mt-2">
                  <div className="w-12 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
                  <div className="w-8 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full ml-1"></div>
                  <div className="w-4 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full ml-1"></div>
                </div>
              </div>
              <div className="ml-auto bg-gray-100 px-4 py-2 rounded-full text-sm font-medium">
                <span className="text-gray-700">{sendData.length} stories</span>
              </div>
            </div>
          )}

          {sendData.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {sendData.slice(0, itemsToShowWithCat).map((filteredData, index) => (
                  <div 
                    key={index} 
                    className="relative group"
                    onClick={() => openStoryModal(filteredData._id)}
                  >
                    <CommanCard filteredData={filteredData} />
                    
                    {currentUser && currentUser === filteredData.postedBy && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openshowAddStoryModalModal();
                          setMyStoryHomeEdits(filteredData.stories);
                        }}
                        className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-all duration-300 transform group-hover:scale-110"
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
                    )}
                  </div>
                ))}
              </div>

              {!isMobile && showMoreVisibleWithCat && sendData.length > 4 && (
                <div className="flex justify-center mt-10">
                  <button 
                    onClick={handleShowMoreWithCategory}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
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
            </>
          ) : (
            <div className="text-center py-20 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl">
              <div className="inline-block bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mb-4"></div>
              <h3 className="text-xl font-medium text-gray-600">No stories available for {allData}</h3>
              <p className="text-gray-500 mt-2 max-w-md mx-auto">
                Be the first to share a story in this category!
              </p>
            </div>
          )}
        </>
      )}

      {/* Modals */}
      {showAddStoryModals && myStoryHomeEdits && (
        <AddStory
          closeModal={closeModal}
          myStoryHomeEdits={myStoryHomeEdits}
          postId={postId}
        />
      )}
      
      {showStoryModal && (
        <StoryStatus postId={postId} closeStoryModal={closeStoryModal} />
      )}
    </div>
  );
}

export default MainCompo;








