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
// import Test from "./Test";
function Home() {
  const [category, setCategory] = useState("");
  const [sendData, setSendData] = useState("");
  // const { postData, loading, fetchPosts } = useApi();

  const stories = [
    {"id":1,"heading":"XYE","description":"barnesandnoble.com","imgUrl":"http://dummyimage.com/231x100.png/dddddd/000000","category":"food","ip_address":"18.77.207.173"},
    {"id":2,"heading":"REZ","description":"google.co.jp","imgUrl":"http://dummyimage.com/122x100.png/dddddd/000000","category":"food","ip_address":"1.195.160.40"},
    {"id":3,"heading":"KTU","description":"digg.com","imgUrl":"http://dummyimage.com/176x100.png/dddddd/000000","category":"food","ip_address":"249.88.160.50"},
    {"id":4,"heading":"LFQ","description":"cisco.com","imgUrl":"http://dummyimage.com/212x100.png/ff4444/ffffff","category":"education","ip_address":"27.248.232.26"},
    {"id":5,"heading":"HBK","description":"tamu.edu","imgUrl":"http://dummyimage.com/193x100.png/5fa2dd/ffffff","category":"education","ip_address":"191.216.4.33"},
    {"id":6,"heading":"SJY","description":"msu.edu","imgUrl":"http://dummyimage.com/165x100.png/5fa2dd/ffffff","category":"education","ip_address":"154.195.14.239"},
    {"id":7,"heading":"JHG","description":"fotki.com","imgUrl":"http://dummyimage.com/129x100.png/dddddd/000000","category":"sports","ip_address":"164.175.210.217"},
    {"id":8,"heading":"VHZ","description":"umn.edu","imgUrl":"http://dummyimage.com/120x100.png/dddddd/000000","category":"sports","ip_address":"122.226.175.161"},
    {"id":9,"heading":"FTU","description":"reuters.com","imgUrl":"http://dummyimage.com/248x100.png/ff4444/ffffff","category":"travel","ip_address":"128.19.22.123"},
    {"id":10,"heading":"MCD","description":"cnbc.com","imgUrl":"http://dummyimage.com/117x100.png/cc0000/ffffff","category":"travel","ip_address":"8.103.173.93"}
];

  const categories = [
    { name: "all", image: Image },
    { name: "education", image: Image1 },
    { name: "sports", image: Image2 },
    { name: "food", image: Image },
    { name: "movies", image: Image3 },
    { name: "travel", image: Image4 }
  ];
  
  const fetchAllJobs = async () => {
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
    fetchAllJobs();
    
  }, [category]);
  const handleCategorySelect = (categoryName) => {
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
        {categories.map((categoryItem, index) => (
          <div className={styles.allCategoryCard} key={index} onClick={() => handleCategorySelect(categoryItem.name)}>
            <CategoryCard

              categoryName={categoryItem.name}
              categoryImage={categoryItem.image}

            />
          </div>
        ))}
      </div>
      <FoodCompo sendData={sendData} category={category}/>
      {/* <Test stories={stories} sendData={sendData}/> */}
    </div>
  )
}

export default Home