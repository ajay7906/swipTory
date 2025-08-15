// import CategoryCard from "../../components/categCard/CategoryCard"

// import Image from '../../assets/all.jpeg'
// import Image1 from '../../assets/education.jpeg';
// import Image2 from '../../assets/download (1).jpeg'
// import Image3 from '../../assets/download.jpeg'
// import Image4 from '../../assets/download (2).jpeg'
// import Image5 from '../../assets/india.jpeg'
// import styles from './Home.module.css'
// import MainCompo from "../../components/main/MainCompo";

// import { useContext, useEffect, useState } from "react";
// import { getAllPost } from "../../api/post";

// import YourStoryCompo from "../../components/yourstory/YourStoryCompo";

// import { useMediaQuery } from 'react-responsive';
// import Loader from "../../components/loader/Loader";
// import { AuthContext } from "../../context/authContext";

// function Home() {
//   const isMobiles = useMediaQuery({ maxWidth: 780 });
//   const { showYourStory, key} = useContext(AuthContext);
 
//   const [category, setCategory] = useState(isMobiles ? 'Education' : '');
//   const [sendData, setSendData] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [allData, setAllData] = useState("");


//   const [selectedCategory, setSelectedCategory] = useState('');


//   let categories = [
//     { name: "All", image: Image },
//     { name: "Education", image: Image1 },
//     { name: "Sports", image: Image3 },
//     { name: "Fruits", image: Image2 },
//     { name: "World", image: Image4 },
//     { name: "India", image: Image5 }
//   ];


//   const fetchAllPost = async () => {
//     try {
//       setLoading(true)
//       if (isMobiles && (!category || category === 'All')) {
//         setCategory('Education')
//         const result = await getAllPost({ category: 'Education' });
//         setSendData(result?.data)
       

//       } else {
//         const result = await getAllPost({ category });

//         setSendData(result?.data)
//         setLoading(false)
    

//       }
//     } catch (error) {
//      return error
//     }
//     setLoading(false)

//   };

 




//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const tokenExpiration = localStorage.getItem("tokenExpiration");

//     if (token && tokenExpiration) {
//       const now = Date.now();
//       if (now >= tokenExpiration) {
//         // Token is expired, remove it
//         localStorage.removeItem("token");
//         localStorage.removeItem("tokenExpiration");
//       } else {
//         // Token is still valid, set a timeout to remove it
//         const remainingTime = tokenExpiration - now;
//         setTimeout(() => {
//           localStorage.removeItem("token");
//           localStorage.removeItem("tokenExpiration");
//         }, remainingTime);
//       }
//     }
//   }, []);










//   useEffect(() => {


//     fetchAllPost();


//   }, [category, isMobiles]);


//   useEffect(() => {

//     setAllData('All');
//   }, []);



//   const handleCategorySelect = (categoryName) => {
//     setSelectedCategory(categoryName);
//     setAllData(categoryName)
//     setCategory(categoryName === "All" ? "" : categoryName);
   


//   };







//   return (
//     <div>

//       <div className={styles.categoryCard}>


//         {categories.map((categoryItem, index) => {
//           if (isMobiles && categoryItem.name === "All") {
//             return;
//           }
//           const isActive = selectedCategory === categoryItem.name;
//           return (
//             <div className={`${styles.allCategoryCard} ${isActive ? styles.activeCategory : ''}`} key={index} onClick={() => handleCategorySelect(categoryItem.name)}>
//               <CategoryCard
//                 categoryName={categoryItem.name}
//                 categoryImage={categoryItem.image}
//                 isActive={isActive}
//               />
//             </div>
//           );
//         })}
//       </div>
//       <>
//      { !isMobiles && showYourStory &&<div>
//           <YourStoryCompo  key={key}/>
//         </div>}
//       </> 

//       {loading ?
//         (
//           <Loader />
//         ) :
//         <>
        
//           <MainCompo sendData={sendData} allData={allData} />
//         </>
//       }


//     </div>
//   )
// }

// export default Home


import { useContext, useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive';
import { getAllPost } from "../../api/post";
import { AuthContext } from "../../context/authContext";
import MainCompo from "../../components/main/MainCompo";
import YourStoryCompo from "../../components/yourstory/YourStoryCompo";
import Loader from "../../components/loader/Loader";

// Import category images
import AllImage from '../../assets/all.jpeg';
import EducationImage from '../../assets/education.jpeg';
import SportsImage from '../../assets/download (1).jpeg';
import FruitsImage from '../../assets/download.jpeg';
import WorldImage from '../../assets/download (2).jpeg';
import IndiaImage from '../../assets/india.jpeg';

function Home() {
  const isMobiles = useMediaQuery({ maxWidth: 780 });
  const { showYourStory, key } = useContext(AuthContext);
  const [category, setCategory] = useState(isMobiles ? 'Education' : '');
  const [sendData, setSendData] = useState("");
  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    { name: "All", image: AllImage, color: "from-blue-500 to-indigo-600" },
    { name: "Education", image: EducationImage, color: "from-emerald-500 to-teal-600" },
    { name: "Sports", image: SportsImage, color: "from-amber-500 to-orange-600" },
    { name: "Fruits", image: FruitsImage, color: "from-lime-500 to-green-600" },
    { name: "World", image: WorldImage, color: "from-violet-500 to-purple-600" },
    { name: "India", image: IndiaImage, color: "from-rose-500 to-red-600" }
  ];

  const fetchAllPost = async () => {
    try {
      setLoading(true);
      if (isMobiles && (!category || category === 'All')) {
        setCategory('Education');
        const result = await getAllPost({ category: 'Education' });
        setSendData(result?.data);
      } else {
        const result = await getAllPost({ category });
        setSendData(result?.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    if (token && tokenExpiration) {
      const now = Date.now();
      if (now >= tokenExpiration) {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
      } else {
        const remainingTime = tokenExpiration - now;
        const timeoutId = setTimeout(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
        }, remainingTime);
        return () => clearTimeout(timeoutId);
      }
    }
  }, []);

  useEffect(() => {
    fetchAllPost();
  }, [category, isMobiles]);

  useEffect(() => {
    setAllData('All');
  }, []);

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    setAllData(categoryName);
    setCategory(categoryName === "All" ? "" : categoryName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-10">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-purple-900 via-indigo-800 to-purple-900 py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 p-1 rounded-lg mb-6">
            <div className="bg-gray-900 rounded-md px-4 py-1">
              <span className="text-xs font-semibold tracking-wider text-white uppercase">
                Explore Our Collection
              </span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
            Discover Amazing Stories
          </h1>
          
          <p className="max-w-3xl mx-auto text-xl text-gray-200 mb-10">
            Dive into captivating tales across diverse categories. Find stories that inspire, entertain, and educate.
          </p>
          
          <div className="flex justify-center space-x-3">
            <div className="w-16 h-2 bg-pink-500 rounded-full"></div>
            <div className="w-8 h-2 bg-indigo-500 rounded-full"></div>
            <div className="w-4 h-2 bg-purple-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Category Filter Section */}
      <div className="py-12 px-4 md:px-8 -mt-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Browse Categories
                  </h2>
                  <p className="text-gray-600 max-w-xl">
                    Select a category to explore stories tailored to your interests
                  </p>
                </div>
                
                <div className="mt-4 md:mt-0">
                  <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full">
                    <span className="text-sm font-medium text-gray-700">
                      {categories.length} Categories
                    </span>
                    <span className="ml-2 w-8 h-8 flex items-center justify-center bg-white rounded-full text-xs font-bold text-purple-600 shadow">
                      {selectedCategory || "All"}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="relative mb-10">
                <div className="flex overflow-x-auto pb-8 hide-scrollbar -mx-2">
                  <div className="flex space-x-6 px-2">
                    {categories.map((categoryItem, index) => {
                      if (isMobiles && categoryItem.name === "All") return null;
                      
                      const isActive = selectedCategory === categoryItem.name;
                      return (
                        <div 
                          key={index}
                          onClick={() => handleCategorySelect(categoryItem.name)}
                          className={`
                            flex-shrink-0 rounded-2xl shadow-lg overflow-hidden cursor-pointer
                            transition-all duration-300 transform
                            ${isActive 
                              ? "ring-4 ring-blue-400 scale-105" 
                              : "hover:scale-105 hover:shadow-xl"}
                            w-64 h-80
                            relative
                          `}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                          <div className={`absolute inset-0 bg-gradient-to-b ${categoryItem.color} mix-blend-multiply opacity-70`}></div>
                          
                          <img 
                            src={categoryItem.image} 
                            alt={categoryItem.name}
                            className="w-full h-full object-cover"
                          />
                          
                          <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                            <h3 className={`text-2xl font-bold text-white mb-2 ${isActive ? "text-yellow-300" : ""}`}>
                              {categoryItem.name}
                            </h3>
                            
                            <div className="flex justify-center">
                              <div className={`w-8 h-1 rounded-full ${isActive ? "bg-yellow-400" : "bg-white"}`}></div>
                            </div>
                            
                            {isActive && (
                              <div className="mt-3 animate-bounce">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Gradient Fade Effect */}
                <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Your Story Component */}
      {!isMobiles && showYourStory && (
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8">
          <YourStoryCompo key={key} />
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        ) : (
          <MainCompo sendData={sendData} allData={allData} />
        )}
      </div>
    </div>
  );
}

export default Home;