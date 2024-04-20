import CategoryCard from "../../components/categCard/CategoryCard"
import Navbar from "../../components/navbar/Navbar"
import Image from '../../assets/img1.jpg'
import Image1 from '../../assets/img2.jpeg';
import Image2 from '../../assets/download (1).jpeg'
import Image3 from '../../assets/download.jpeg'
import Image4 from '../../assets/download (2).jpeg'
import styles from './Home.module.css'
import FoodCompo from "../../components/food/FoodCompo";
function Home() {
  const categories = [
    { name: "all", image:Image },
    { name: "education", image: Image1 },
    { name: "sports", image:Image2 },
    { name: "food", image: Image },
    { name: "movies", image: Image3 },
    { name: "travel", image: Image4 }
  ];
  return (
    <div>
      <Navbar />
      <div className={styles.categoryCard}>
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            categoryName={category.name}
            categoryImage={category.image}
          />
        ))}
      </div>
      <FoodCompo/>
    </div>
  )
}

export default Home