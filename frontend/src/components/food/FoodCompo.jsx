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






import CommanCard from "../commoncard/CommanCard";
import styles from './FoodCompo.module.css';
import React from "react";

function FoodCompo({ sendData, category }) {
    if (!Array.isArray(sendData)) {
        return null; // Return null if sendData is not an array
    }

    return (
        <div className={styles.data}>
            <div className={styles.htag}><h2>Top Stories About {category}</h2></div>
            {/* Render CommanCard components for each category */}
            {sendData.map((categoryData, index) => (
                <div key={index}>
                    <div className={styles.main}>
                        {categoryData.slide.map((slideItem, slideIndex) => (
                            <div key={slideIndex}>
                                <CommanCard />
                                {/* {slideItem.stories.map((story, storyIndex) => (
                                    <CommanCard key={storyIndex} data={story} />
                                ))} */}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FoodCompo;
