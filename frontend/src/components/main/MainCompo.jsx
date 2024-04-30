


import { getPostById } from "../../api/post";
import CommanCard from "../commoncard/CommanCard";
import StoryStatus from "../status/StoryStatus";
import styles from './MainCompo.module.css';
import React, { useEffect, useState } from "react";

import { jwtDecode } from 'jwt-decode';
import AddStory from "../addStory/AddStory";
import useMediaQuery from "../../utils/screenSize";

function MainCompo({ sendData, allData, handleDisplayData }) {
    const [showStoryModal, setShowStoryModal] = useState(false)

    const [myStoryHomeEdits, setMyStoryHomeEdits] = useState();
    const [currentUser, setCurrentUser] = useState(null);
    const [showAddStoryModals, setShowAddStoryModals] = useState(false);
    const [postId, setPostId] = useState();
    const [itemsToShow, setItemsToShow] = useState(4); // Initial number of items to show
    const [showMoreVisible, setShowMoreVisible] = useState(true);
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

    // Function to handle the "show more" button click event
    const handleShowMore = () => {
        setItemsToShow(sendData.length); // Show all items
        setShowMoreVisible(false); // Hide the "show more" button
    };

    // const [imageData, setImageData] = useState()
    // let displayData = sendData;
    console.log(sendData);
    if (!Array.isArray(sendData)) {
        return null; // Return null if sendData is not an array
    }

    // console.log(allData === "all");
    let categoryMap = ['Education', 'sports', 'Fruits', 'World', 'India'];
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
                allData === "All" ?
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
                            .length > 0 ? (<>
                                <div className={styles.main}>
                                    {sendData
                                        .filter((categoryData) => categoryData.chooseCategory === categoryName)
                                        .slice(0, itemsToShow).map((filteredData, index) => (

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
                                {showMoreVisible && (
                                    <div className={styles.showMoreBtnParen}>
                                        <button onClick={handleShowMore} className={styles.showMoreBtn}>See More</button>
                                    </div>
                                )}
                            </>
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
                                <>
                                    <div className={styles.main}>
                                        {sendData.slice(0, itemsToShow).map((filteredData, index) => (
                                            <div key={index} onClick={() => openStoryModal(filteredData._id)}>
                                                {console.log(filteredData)}
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
                                    {showMoreVisible && (
                                        <div className={styles.showMoreBtnParen}>
                                            <button onClick={handleShowMore} className={styles.showMoreBtn}>See More</button>
                                        </div>
                                    )}
                                </>




                            ) : (

                                <div className={styles.storyNotFound}><h3>No stories Available</h3></div>
                            )


                        }
                    </div>
                </>
            }
            <div>
                {showAddStoryModals && myStoryHomeEdits && <AddStory
                    closeModal={closeModal}
                    myStoryHomeEdits={myStoryHomeEdits}
                    postId={postId}
                />}
                {showStoryModal && <StoryStatus postId={postId} closeStoryModal={closeStoryModal} />}
            </div>
        </div>
    );
}

export default MainCompo;

