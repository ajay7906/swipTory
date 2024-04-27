import CategoryCard from "../../components/categCard/CategoryCard"
import Navbar from "../../components/navbar/Navbar"
import Image from '../../assets/img1.jpg'
import Image1 from '../../assets/img2.jpeg';
import Image2 from '../../assets/download (1).jpeg'
import Image3 from '../../assets/download.jpeg'
import Image4 from '../../assets/download (2).jpeg'
import styles from './Home.module.css'
import FoodCompo from "../../components/food/FoodCompo";
import Layout from "../../components/layout/Layout";
import BookMark from "../bookmarks/BookMark";

// import { useApi } from "../../api/post";
import { useEffect, useState } from "react";
import { getAllPost } from "../../api/post";
import Test from "./Test";
import YourStoryCompo from "../../components/yourstory/YourStoryCompo";
import useMediaQuery from "../../utils/screenSize";
// import Test from "./Test";
function Home() {
  const [category, setCategory] = useState("");
  const [sendData, setSendData] = useState("");
  const [allData, setAllData] = useState("");
  const isMobile = useMediaQuery('(max-width: 780px)');
  // const { postData, loading, fetchPosts } = useApi();



  const categories = [
    { name: "all", image: Image },
    { name: "education", image: Image1 },
    { name: "sports", image: Image2 },
    { name: "food", image: Image },
    { name: "movies", image: Image3 },
    { name: "travel", image: Image4 }
  ];

  const fetchAllPost = async () => {
    try {
      const result = await getAllPost({ category });

      console.log("Fetched data for category:", category);
      setSendData(result.data)

      console.log("Result:", result.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }

  };

  useEffect(() => {
    fetchAllPost();

  }, [category]);
  useEffect(() => {

    setAllData('all');
  }, []);

  const handleCategorySelect = (categoryName) => {
    
    setAllData(categoryName)
    setCategory(categoryName === "all" ? "" : categoryName);
    console.log(categoryName);
    console.log(category);


  };
  
  if (isMobile) {
    if (!category) {
      setCategory('education')
      
    }
    
  }

  // const handleCategorySelect = (categoryName) => {
  //   if (!isMobile) {
  //     if (!categoryName) {
  //       setAllData("education");
  //       setCategory("education");
  //     } else {
  //       setAllData(categoryName);
  //       setCategory(categoryName);
  //     }
  //   } else {
  //     setAllData(categoryName === "all" ? "all" : categoryName);
  //     setCategory(categoryName === "all" ? "" : categoryName);
  //   }
  //   console.log(categoryName);
  //   console.log(category);
  // };





  console.log(sendData);
  return (
    <div>
      {/* <Navbar /> */}
      {/* <Layout>
        <BookMark/>
      </Layout> */}
      <div className={styles.categoryCard}>

        {/* {categories.map((categoryItem, index) => (
         
          <div className={styles.allCategoryCard} key={index} onClick={() => handleCategorySelect(categoryItem.name)}>
            <CategoryCard

              categoryName={categoryItem.name}
              categoryImage={categoryItem.image}

            />
          </div>
        ))} */}
        {categories.map((categoryItem, index) => {
          if (isMobile && categoryItem.name === "all") {
            return null; // Don't render the "All" category button on mobile
          }
          return (
            <div className={styles.allCategoryCard} key={index} onClick={() => handleCategorySelect(categoryItem.name)}>
              <CategoryCard
                categoryName={categoryItem.name}
                categoryImage={categoryItem.image}
              />
            </div>
          );
        })}
      </div>
      {/* <div>
          <YourStory/>
        </div> */}
      {!isMobile && <div>
        <YourStoryCompo />
      </div>}
      <FoodCompo sendData={sendData} allData={allData} />

      {/* <Test stories={stories} sendData={sendData}/> */}
    </div>
  )
}

export default Home