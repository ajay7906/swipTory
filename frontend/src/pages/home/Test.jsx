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






import React from "react";

function Test({ sendData }) {
    // Group stories by category
    if (!Array.isArray(sendData)) {
        return null;
    }
    const groupedStories = {};
    sendData.forEach(story => {
        const category = story.chooseCategory;
        if (!groupedStories[category]) {
            groupedStories[category] = [];
        }
        groupedStories[category].push(story);
    });
    // const flattenedData = sendData.flat();
    // const groupedStories = flattenedData.reduce((acc, story) => {
    //     const category = story.chooseCategory;
    //     if (!acc[category]) {
    //         acc[category] = [];
    //     }
    //     acc[category].push(story);
    //     return acc;
    // }, {});
    

   

    console.log(groupedStories);
    // Render stories by category
    const renderStoriesByCategory = () => {
        return Object.entries(groupedStories).map(([category, stories], index) => (
            <div key={category}>
                {index === 0 && <h2>{category}</h2>}
                <div>
                    {stories.map((story, storyIndex) => (
                        <div key={storyIndex}>
                            <p>{story.heading}</p>
                            <p>{story.description}</p>
                            <img src={story.image} alt={story.heading} />
                        </div>
                    ))}
                </div>
            </div>
        ));
    };

    return (
        <div>
            {renderStoriesByCategory()}
        </div>
    );
}

export default Test;
