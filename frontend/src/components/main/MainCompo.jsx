



import CommanCard from "../commoncard/CommanCard";
import StoryStatus from "../status/StoryStatus";
import styles from './MainCompo.module.css';
import React, { useEffect, useState } from "react";

import AddStory from "../addStory/AddStory";


import { jwtDecode } from 'jwt-decode';

import useMediaQuery from "../../utils/screenSize";

function MainCompo({ sendData, allData }) {
    const [showStoryModal, setShowStoryModal] = useState(false)
   
    const [myStoryHomeEdits, setMyStoryHomeEdits] = useState();
    const [currentUser, setCurrentUser] = useState(null);
    const [showAddStoryModals, setShowAddStoryModals] = useState(false);
    const [postId, setPostId] = useState();
   
    const [itemsToShowWithCat, setItemsToShowWithCat] = useState(4); 
    const [showMoreVisible, setShowMoreVisible] = useState(true);
    const [showMoreVisibleWithCat, setShowMoreVisibleWithCat] = useState(true);
    const [categoryItemsToShow, setCategoryItemsToShow] = useState({});
    const isMobile = useMediaQuery('(max-width: 780px)');
    let categoryMap = ['Education', 'sports', 'Fruits', 'World', 'India'];
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
        
        setShowAddStoryModals(true);

    };
   
     


   
    const handleShowMore = (categoryName) => {
        setCategoryItemsToShow((prevState) => ({
            ...prevState,
            [categoryName]: sendData.filter((item) => item.chooseCategory === categoryName).length,
        }));
        setShowMoreVisible(false)
    };

    const handleShowMoreWithCategory = () => {
        setShowMoreVisibleWithCat(false)
        setItemsToShowWithCat(sendData.length)

    }
    
    if (!Array.isArray(sendData)) {
        return null;  
    }

   
   
    
    const openStoryModal = (postId) => {
        setPostId(postId)
        setShowStoryModal(true);

    };
    const closeStoryModal = () => {
        setShowStoryModal(false)
    }



    return (
        <div className={styles.data}>
            {!isMobile &&
                allData === "All" ?
                <> {categoryMap.map((categoryName, index) => (
                    <div key={index}>
                       
                        <div className={styles.htag}><h2>Top Stories About {categoryName}</h2></div>
                      
                        {sendData
                            .filter((categoryData) => categoryData.chooseCategory === categoryName)
                            .length > 0 ? (<>
                                <div className={styles.main}>
                                    {sendData
                                        .filter((categoryData) => categoryData.chooseCategory === categoryName)
                                        .slice(0, categoryItemsToShow[categoryName] || 4).map((filteredData, index) => (

                                            <div className={styles.CommanCardMain} key={index} onClick={() => openStoryModal(filteredData._id)}>
                                               

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
                               
                                {!categoryItemsToShow[categoryName] && ( // Show the button only if categoryItemsToShow doesn't have a value for the current category
                                    <div className={styles.showMoreBtnParen}>
                                        <button onClick={() => handleShowMore(categoryName)} className={styles.showMoreBtn}>
                                            See More
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className={styles.storyNotFound}><h3>No stories Available</h3></div>
                        )}
                       


                    </div>
                ))}</>
                :
                <>
                    <div >
                        {isMobile ? <> </> :
                            <> <div className={styles.htag}><h2>Top Stories About {allData}</h2></div></>}
                     
                        {
                            sendData.length > 0 ? (
                                <>
                                    <div className={styles.main}>
                                        {sendData.slice(0, itemsToShowWithCat).map((filteredData, index) => (
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
                                    {showMoreVisibleWithCat && (
                                        <div className={styles.showMoreBtnParen}>
                                            <button onClick={handleShowMoreWithCategory} className={styles.showMoreBtn}>See More</button>
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















