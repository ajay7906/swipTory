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


import CommanCard from "../commoncard/CommanCard";
import styles from './FoodCompo.module.css';
import React from "react";

function FoodCompo({ sendData, category }) {
    if (!Array.isArray(sendData)) {
        return null; // Return null if sendData is not an array
    }

    let categoryMap = ['education', 'sports', 'food', 'movies', 'travel'];

    return (
        <div className={styles.data}>
            {categoryMap.map((categoryName, index) => (
                <div key={index}>
                    <div className={styles.htag}><h2>Top Stories About {categoryName}</h2></div>
                    <div className={styles.main}>
                        {sendData
                            .filter(categoryData => categoryData.chooseCategory === categoryName)
                            .map((filteredData, index) => (
                                <div key={index}>
                                    <CommanCard />
                                </div>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FoodCompo;

