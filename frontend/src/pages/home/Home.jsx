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
//import useMediaQuery from "../../utils/screenSize";
import { useMediaQuery } from 'react-responsive';

function Home() {
  const isMobiles = useMediaQuery({ maxWidth: 780 });
  
  //const [category, setCategory] = useState("");
  const [category, setCategory] = useState(isMobiles ? 'education' : '');
  const [sendData, setSendData] = useState("");
  const [sendIsMobile, setSendIsMobile] = useState("");
  const [allData, setAllData] = useState("");
  //const [isInitialRender, setIsInitialRender] = useState(true);
  const [newIsMobile, setNewIsMobile] = useState(isMobiles)
  // const { postData, loading, fetchPosts } = useApi();
  // useEffect(() => {
  //   if (isMobiles && (!category || category === "all")) {
  //     setCategory('education');
    
  //   }
  //   else if (!category) {
  //     setCategory('');
  //   }
  
  // }, [category, isMobiles]);
  // useEffect(() => {
  //   if (isInitialRender) {
  //     setCategory(isMobiles ? 'education' : '');
  //     setIsInitialRender(false);
  //   }
  // }, [isInitialRender, isMobiles]);

 
   console.log(isMobiles);

  let categories = [
    { name: "all", image: Image },
    { name: "education", image: Image1 },
    { name: "sports", image: Image2 },
    { name: "food", image: Image },
    { name: "movies", image: Image3 },
    { name: "travel", image: Image4 }
  ];
 
  
  console.log(isMobiles && (!category || category === 'all'));
  console.log(isMobiles && !category);
  console.log(isMobiles ? 'education' :'');


  console.log(isMobiles );
  
 // console.log(handleDisplayData);
  const fetchAllPost = async () => {
    try {
      
     if (isMobiles && (!category || category === 'all')   ) {
        setCategory('education')
      const result = await getAllPost( { category: 'education' });
      setSendData(result?.data)
      
     } else {
      const result = await getAllPost( { category });

      console.log("Fetched data for category:", category);
      setSendData(result?.data)
      console.log('categor', category);
      console.log("Result:", result.data);
      
     }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }

  };



  // const fetchAllPost = async () => {
  //   try {
  //     if (isInitialRender) {
  //       const result = await getAllPost({ category: isMobiles ? 'education' : '' });
  //       setSendData(result?.data);
  //     } else {
  //       if (isMobiles && (!category || category === 'all')) {
  //         setCategory('education');
  //         const result = await getAllPost({ category: 'education' });
  //         setSendData(result?.data);
  //       } else {
  //         const result = await getAllPost({ category });
  //         console.log("Fetched data for category:", category);
  //         setSendData(result?.data);
  //         console.log('category', category);
  //         console.log("Result:", result.data);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error fetching posts:", error);
  //   }
  // };



  
  // const fetchAllPost = async () => {
  //   try {
      
  //     const result = await getAllPost( { category });

  //     console.log("Fetched data for category:", category);
  //     setSendData(result?.data)
  //     console.log('categor', category);
  //     console.log("Result:", result.data);
      
      
     
  //   } catch (error) {
  //     console.error("Error fetching posts:", error);
  //   }

  // };


  console.log(isMobiles);

  useEffect(() => {
    

    fetchAllPost();
    //  fetchAllPost()

  }, [category, isMobiles ]);


  useEffect(() => {

    setAllData('all');
  }, []);



  const handleCategorySelect = (categoryName) => {

    setAllData(categoryName)
    setCategory(categoryName === "all" ? "" : categoryName);
    console.log(categoryName);
    console.log(category);


  };

  




  console.log(sendData);
  return (
    <div>
      {/* <Navbar /> */}
      {/* <Layout>
        <BookMark/>
      </Layout> */}
      <div className={styles.categoryCard}>

       
        {categories.map((categoryItem, index) => {
          if (isMobiles && categoryItem.name === "all") {
             return ;
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
      {!isMobiles && <div>
        <YourStoryCompo />
      </div>}
      <FoodCompo sendData={sendData} allData={allData}  />

      {/* <Test stories={stories} sendData={sendData}/> */}
    </div>
  )
}

export default Home