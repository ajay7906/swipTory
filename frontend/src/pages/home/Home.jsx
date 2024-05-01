import CategoryCard from "../../components/categCard/CategoryCard"

import Image from '../../assets/all.jpeg'
import Image1 from '../../assets/education.jpeg';
import Image2 from '../../assets/download (1).jpeg'
import Image3 from '../../assets/download.jpeg'
import Image4 from '../../assets/download (2).jpeg'
import Image5 from '../../assets/india.jpeg'
import styles from './Home.module.css'
import MainCompo from "../../components/main/MainCompo";

import { useContext, useEffect, useState } from "react";
import { getAllPost } from "../../api/post";

import YourStoryCompo from "../../components/yourstory/YourStoryCompo";

import { useMediaQuery } from 'react-responsive';
import Loader from "../../components/loader/Loader";
import { AuthContext } from "../../context/authContext";

function Home() {
  const isMobiles = useMediaQuery({ maxWidth: 780 });
  const { showYourStory } = useContext(AuthContext);
 
  const [category, setCategory] = useState(isMobiles ? 'Education' : '');
  const [sendData, setSendData] = useState("");
  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState("");


  const [selectedCategory, setSelectedCategory] = useState('');


  let categories = [
    { name: "All", image: Image },
    { name: "Education", image: Image1 },
    { name: "Sports", image: Image3 },
    { name: "Fruits", image: Image2 },
    { name: "World", image: Image4 },
    { name: "India", image: Image5 }
  ];


  const fetchAllPost = async () => {
    try {
      setLoading(true)
      if (isMobiles && (!category || category === 'All')) {
        setCategory('Education')
        const result = await getAllPost({ category: 'Education' });
        setSendData(result?.data)
       

      } else {
        const result = await getAllPost({ category });

        setSendData(result?.data)
        setLoading(false)
    

      }
    } catch (error) {
     return error
    }
    setLoading(false)

  };







  useEffect(() => {


    fetchAllPost();


  }, [category, isMobiles]);


  useEffect(() => {

    setAllData('All');
  }, []);



  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    setAllData(categoryName)
    setCategory(categoryName === "All" ? "" : categoryName);
   


  };







  return (
    <div>

      <div className={styles.categoryCard}>


        {categories.map((categoryItem, index) => {
          if (isMobiles && categoryItem.name === "All") {
            return;
          }
          const isActive = selectedCategory === categoryItem.name;
          return (
            <div className={`${styles.allCategoryCard} ${isActive ? styles.activeCategory : ''}`} key={index} onClick={() => handleCategorySelect(categoryItem.name)}>
              <CategoryCard
                categoryName={categoryItem.name}
                categoryImage={categoryItem.image}
                isActive={isActive}
              />
            </div>
          );
        })}
      </div>
      {!isMobiles && showYourStory &&<div>
            <YourStoryCompo />
          </div>}

      {loading ?
        (
          <Loader />
        ) :
        <>
        
          <MainCompo sendData={sendData} allData={allData} />
        </>
      }


    </div>
  )
}

export default Home