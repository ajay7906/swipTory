import CategoryCard from "../../components/categCard/CategoryCard"

import Image from '../../assets/all.jpeg'
import Image1 from '../../assets/education.jpeg';
import Image2 from '../../assets/download (1).jpeg'
import Image3 from '../../assets/download.jpeg'
import Image4 from '../../assets/download (2).jpeg'
import Image5 from '../../assets/india.jpeg'
import styles from './Home.module.css'
import FoodCompo from "../../components/food/FoodCompo";

import { useEffect, useState } from "react";
import { getAllPost } from "../../api/post";

import YourStoryCompo from "../../components/yourstory/YourStoryCompo";

import { useMediaQuery } from 'react-responsive';

function Home() {
  const isMobiles = useMediaQuery({ maxWidth: 780 });


  const [category, setCategory] = useState(isMobiles ? 'Education' : '');
  const [sendData, setSendData] = useState("");

  const [allData, setAllData] = useState("");


  const [selectedCategory, setSelectedCategory] = useState('');


  let categories = [
    { name: "All", image: Image },
    { name: "Education", image: Image1 },
    { name: "sports", image: Image3 },
    { name: "Fruits", image: Image2 },
    { name: "World", image: Image4 },
    { name: "India", image: Image5 }
  ];


  const fetchAllPost = async () => {
    try {

      if (isMobiles && (!category || category === 'All')) {
        setCategory('Education')
        const result = await getAllPost({ category: 'Education' });
        setSendData(result?.data)

      } else {
        const result = await getAllPost({ category });

        console.log("Fetched data for category:", category);
        setSendData(result?.data)
        console.log('categor', category);
        console.log("Result:", result.data);

      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }

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
    console.log(categoryName);
    console.log(category);


  };






  console.log(sendData);
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

      {!isMobiles && <div>
        <YourStoryCompo />
      </div>}
      <FoodCompo sendData={sendData} allData={allData} />


    </div>
  )
}

export default Home