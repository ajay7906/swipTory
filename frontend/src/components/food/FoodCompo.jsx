// import CommanCard from "../commoncard/CommanCard";
// import styles from './FoodCompo.module.css';
// import React from "react";
// function FoodCompo({ sendData, category }) {
//     // Function to render CommanCard components for each category

//         const renderCategoryCards = () => {
//             if (!Array.isArray(sendData)) {
//                 return null;} // Return null if sendData is not an array
//             return sendData?.map((categoryData, index) => (
//                 <div key={index}>
//                     <div className={styles.htag}><h2>Top Stories About {category}</h2></div>
//                     <div className={styles.main}>
//                         {categoryData?.slide?.map((slideItem, slideIndex) => (
//                             <div key={slideIndex}>
//                                 <CommanCard />
//                                 {/* {slideItem.stories.map((  story, storyIndex) => (
//                                 <CommanCard key={storyIndex} data={story} />
//                             ))} */}
//                             </div>
//                         ))}


//                     </div>
//                 </div>
//             ));
//         };

//         return (
//             <div className={styles.data}>
//                 {/* Render CommanCard components for each category */}
//                 {renderCategoryCards()}
//             </div>
//         );
//     }

//     export default FoodCompo;






// import CommanCard from "../commoncard/CommanCard";
// import styles from './FoodCompo.module.css';
// import React from "react";

// function FoodCompo({ sendData, category }) {
//     if (!Array.isArray(sendData)) {
//         return null; // Return null if sendData is not an array
//     }

//     // const storiesByCategory = sendData?.reduce((acc, story) => {
//     //     const category = story.category;
//     //     console.log(category);
//     //     if (!acc[category]) {
//     //         acc[category] = [];
//     //     }
//     //     acc[category].push(story);
//     //     return acc;
//     // }, {});
//     // console.log(storiesByCategory);


//     console.log(sendData);
//     let categoryMap = ['education', 'sports', 'food', 'movies', 'travel'];
//     // if (!Array.isArray(categoryMap)) {
//     //     return null; // Return null if sendData is not an array
//     // }
//     return (
//         <div className={styles.data}>
//             {categoryMap.map((categoryName, index) => (
//                 <div key={index}>
//                     <div className={styles.htag}><h2>Top Stories About {categoryName}</h2></div>
//                     <div className={styles.main}>
//                         {sendData.map((categoryData, index) => (
//                             <div key={index}  >

//                                 {
//                                     categoryData.chooseCategory === categoryName ?
//                                         <>
//                                             <CommanCard />
//                                         </> :
//                                         <>
//                                         </>
//                                 }
//                             </div>
//                         ))}
//                     </div>

//                 </div>
//             ))}



//         </div>
//     );
// }

// export default FoodCompo;


import { getPostById } from "../../api/post";
import CommanCard from "../commoncard/CommanCard";
import StoryStatus from "../status/StoryStatus";
import styles from './FoodCompo.module.css';
import React, { useEffect, useState } from "react";
// import jwt_decode from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';
import AddStory from "../addStory/AddStory";
import useMediaQuery from "../../utils/screenSize";

function FoodCompo({ sendData, allData, handleDisplayData }) {
    const [showStoryModal, setShowStoryModal] = useState(false)
    const [filteredData, setFilteredData] = useState([])
    const [myStoryHomeEdits, setMyStoryHomeEdits] = useState();
    const [currentUser, setCurrentUser] = useState(null);
    const [showAddStoryModals, setShowAddStoryModals] = useState(false);
    const [postId, setPostId] = useState();
    const isMobile = useMediaQuery('(max-width: 780px)');
    console.log(allData);
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = jwtDecode(token);
            setCurrentUser(decodedToken.userId);
        }

    }, []);
    useEffect(() => {

    }, [isMobile])


    const closeModal = () => {

        setShowAddStoryModals(false)
    };

    const openshowAddStoryModalModal = () => {
        // setMyStoryId(myStorId)
        setShowAddStoryModals(true);

    };


    // const [imageData, setImageData] = useState()
    let displayData = sendData;
    console.log(sendData);
    if (!Array.isArray(sendData)) {
        return null; // Return null if sendData is not an array
    }

    // console.log(allData === "all");
    let categoryMap = ['education', 'sports', 'food', 'movies', 'travel'];
    // console.log(displayData);
    const openStoryModal = (postId) => {
        setPostId(postId)
        setShowStoryModal(true);

    };
    const closeStoryModal = () => {
        setShowStoryModal(false)
    }


    // const fetchJobDetails = async () => {
    //     if (!postId) return console.log('nothing');
    //     try {
    //       const result = await getPostById(postId);
    //       setImageData(result?.data)
    //       console.log(result.data);

    //     } catch (error) {
    //       console.log(error);

    //     }

    //   };
    //   useEffect(() => {
    //     fetchJobDetails();
    //   }, [postId]);

    //   useEffect(() => {
    //     if (allData === "all") {
    //         setFilteredData(sendData);
    //     } else {
    //         setFilteredData(sendData.filter(categoryData => categoryData.chooseCategory === allData));
    //     }
    // }, [allData, sendData]);

    return (
        <div className={styles.data}>
            {!isMobile &&
                allData === "all" ?
                <> {categoryMap.map((categoryName, index) => (
                    <div key={index}>
                        <div className={styles.htag}><h2>Top Stories About {categoryName}</h2></div>
                        {/* <div className={styles.main}>
                               
                                {sendData.filter((categoryData) => categoryData.chooseCategory === categoryName).length > 0 ? (
                                    sendData
                                        .filter((categoryData) => categoryData.chooseCategory === categoryName)
                                        .map((filteredData, index) => (
                                            <div key={index} onClick={() => openStoryModal(filteredData._id)}>
                                                <CommanCard filteredData={filteredData} />
                                            </div>
                                        ))
                                ) : (
                                    <div className={styles.storyNotFound}><h3>Stories not found</h3></div>
                                )}
                            </div> */}
                        {sendData
                            .filter((categoryData) => categoryData.chooseCategory === categoryName)
                            .length > 0 ? (
                            <div className={styles.main}>
                                {sendData
                                    .filter((categoryData) => categoryData.chooseCategory === categoryName)
                                    .map((filteredData, index) => (

                                        <div className={styles.CommanCardMain} key={index} onClick={() => openStoryModal(filteredData._id)}>
                                            {console.log(filteredData.stories)}
                                            <CommanCard filteredData={filteredData} />
                                            {currentUser && currentUser === filteredData.postedBy && ( // Check if currentUserId matches postedByUserId
                                                <div className={styles.editBtn} onClick={(e) => {
                                                    e.stopPropagation()
                                                    openshowAddStoryModalModal()
                                                    setMyStoryHomeEdits(filteredData.stories)

                                                }}>
                                                    <img src="https://swiptory001.netlify.app/static/media/editButton.8b3d5ff3671f9f234629624ceefe1735.svg" alt="" />
                                                    <p>edit</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                            </div>
                        ) : (
                            <div className={styles.storyNotFound}><h3>No stories Available</h3></div>
                        )}
                        {/* {sendData
                                    .filter(categoryData => categoryData.chooseCategory === categoryName)
                                    .map((filteredData, index) => (
                                       
                                        <div key={index} onClick={()=>openStoryModal(filteredData._id)}>
                                        

                                            <CommanCard filteredData={filteredData} />

                                        </div>
                                    ))
                                  
                                    
                                    } */}

                    </div>
                ))}</>
                :
                <>
                    <div >
                        {isMobile ? <> </> :
                            <> <div className={styles.htag}><h2>Top Stories About {allData}</h2></div></>}
                        {/* <div className={styles.main}>
                                {sendData

                                    .map((filteredData, index) => (
                                        <div key={index} onClick={openStoryModal} >
                                            
                                            <CommanCard filteredData={filteredData} />
                                        </div>
                                    ))}
                            </div> */}
                        {
                            sendData.length > 0 ? (
                                <div className={styles.main}>
                                    {sendData.map((filteredData, index) => (
                                        <div key={index} onClick={() => openStoryModal(filteredData._id)}>
                                            {console.log(filteredData)}
                                            <CommanCard filteredData={filteredData} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className={styles.storyNotFound}><h3>No stories Available</h3></div>
                            )


                        }
                    </div>
                </>
            }
            <div>
                {showAddStoryModals && myStoryHomeEdits && <AddStory closeModal={closeModal} myStoryHomeEdits={myStoryHomeEdits} />}
                {showStoryModal && <StoryStatus postId={postId} closeStoryModal={closeStoryModal} />}
            </div>
        </div>
    );
}

export default FoodCompo;

