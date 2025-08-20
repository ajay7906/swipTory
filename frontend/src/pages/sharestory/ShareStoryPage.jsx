// import { useContext, useEffect, useRef, useState } from "react";
// import styles from './ShareStory.module.css'
// import {
//   bookMarkPost, createPost, getPostById, getSharePostById, likePost, trackIsLikePost, trackbookMarkPost,
//   tracklikeCountkPost, unbookMarkPost, unlikePost
// } from "../../api/post";

// import LeftMove from '../../assets/left.png'
// import RighttMove from '../../assets/right.png'
// import Remove from '../../assets/Crosss.png'
// import Share from '../../assets/share.png'
// import Save from '../../assets/save.png'
// import BlueSave from '../../assets/save1.png'
// import Unlike from '../../assets/like.png'
// import Like from '../../assets/redlike.png'
// import { useParams } from 'react-router-dom';
// import { RotatingLines } from 'react-loader-spinner'
// import useMediaQuery from "../../utils/screenSize";
// import { ToastContainer, toast, } from 'react-toastify';
// import { AuthContext } from "../../context/authContext";
// import { useNavigate } from 'react-router-dom'
// import Loader from "../../components/loader/Loader";


// function ShareStoryPage({ closeModal, }) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [timerActive, setTimerActive] = useState(true);
//   const [imageData, setImageData] = useState()
//   const [filled, setFilled] = useState(0);
//   const [likeBtn, setLikeBtn] = useState(false)
//   const [likeCountNumber, setLikeCountNumber] = useState(0)
//   const [bookBtn, setBookBtn] = useState(false)
//   const { postId } = useParams();
//   const isMobile = useMediaQuery('(max-width: 700px)');
//   const navigate = useNavigate();
//   const { handleLogin, openLoginModal } = useContext(AuthContext);
//   const [dataLoaded, setDataLoaded] = useState(false);





//   const customToastStyle = {
//     backgroundColor: '#333',
//     color: '#FF0000',
//     fontSize: '20px',
//     padding: '10px 20px',
//     textAlign: 'center',
//     borderRadius: '39px',

//     width: '300px',
//     height: '36px',
//     background: '#D9D9D9',




//   };

//   const generateShareLink = () => {
//     const baseUrl = 'https://swip-tory-six.vercel.app';
//     const shareLink = `${baseUrl}/share/${postId}`;


//     if (navigator.clipboard) {
//       const link = navigator.clipboard.writeText(shareLink);
     

//       toast('Link copied to clipboard', {
//         position: 'top-center',

//         autoClose: 5000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//         style: customToastStyle

//       });
//     } else {
//       window.open(shareLink, '_blank');
//     }
//   };


//   const likeStory = async () => {
//     const loggedInUser = localStorage.getItem('token')
//     if (loggedInUser) {
//       try {
//         const like = await likePost(postId)
//         if (like.success) {
//           setLikeBtn(true)
//           tracklikeCount();
//         }



//       } catch (error) {
//         return error
//       }
//     }
//     else {
//       closeStoryModals()
//       handleLogin()
//       openLoginModal()

//     }


//   }



//   //track like count

//   const tracklikeCount = async () => {

//     try {
//       const like = await tracklikeCountkPost(postId)
//       if (like.success) {
//         setLikeCountNumber(like.likeCount)
//       }



//     } catch (error) {
//      return error
//     }
//   }

//   //track like
//   const trackislike = async () => {

//     try {
//       const like = await trackIsLikePost(postId)
//       if (like.success) {
//         setLikeBtn(true)
//       }



//     } catch (error) {
//       return error
//     }
//   }
//   //unlike 
//   const unlikeStory = async () => {

//     try {
//       const like = await unlikePost(postId)
//       if (like.success) {
//         setLikeBtn(false)
//         tracklikeCount();
//       }



//     } catch (error) {
//      return error
//     }
//   }

//   //trackBook 
//   const trackbookMarkStory = async () => {

//     try {
//       const track = await trackbookMarkPost(postId)
//       if (track.success) {
//         setBookBtn(true)

//       }

//     } catch (error) {
//       return error
//     }
//   }

//   //bookmark  story
//   const bookMarkStory = async () => {
//     if (!postId) return;
//     const token = localStorage.getItem('token')
//     if (!token) {
//       try {
//         const bookMarkPostData = await bookMarkPost(postId)
//         if (bookMarkPostData.success) {
//           setBookBtn(true)

//         }

//       } catch (error) {
//         return error
//       }

//     } else {
//       closeStoryModals()
//       handleLogin()
//       openLoginModal()

//     }
//   }

//   //bookmark  story
//   const unbookMarkStory = async () => {
//     if (!postId) return;
//     try {
//       const like = await unbookMarkPost(postId)
//       if (like.success) {
//         setBookBtn(false)

//       }

//     } catch (error) {
//       return error
//     }
//   }


//   const fetchJobDetails = async () => {
//     if (!postId) return;
//     try {
//       const result = await getSharePostById(postId);
//       console.log(result);
//       setImageData(result?.data)
//       setDataLoaded(true);

//     } catch (error) {
//       return error

//     }

//   };
//   useEffect(() => {
//     fetchJobDetails();
//     trackbookMarkStory();
//     tracklikeCount();
//     trackislike();
//   }, []);


//   const closeStoryModals = () => {
//     navigate('/')
//     // closeStoryModal()
//   }


//   const nextImage = () => {
//     setCurrentIndex((prevIndex) => {
//         // Check if the next index would be out of bounds
//         if (prevIndex === imageData?.length - 1) {
//             // If so, don't change the index
//             return prevIndex;
//         } else {
//             // Otherwise, increment the index by 1
//             return prevIndex + 1;
//         }
//     });
//     setFilled(0);
// }

 
//   const prevImage = () => {
//     if (currentIndex !== 0) {
//       setCurrentIndex((prevIndex) => prevIndex - 1);
//       setFilled(0);
//     }
//   };


//   const handleClick = (e) => {
//     const { clientX } = e;
//     const windowWidth = window.innerWidth;
//     const halfWidth = windowWidth / 2;

//     if (clientX > halfWidth) {
//       nextImage()
//     } else {
//       if (currentIndex !== 0) {
//         prevImage()


//       }
//     }
//   };


//   useEffect(() => {
//     let interval;

//     const startInterval = () => {
//       if (dataLoaded && imageData?.length > 0) {
//         interval = setInterval(() => {
         
//           // Progress bar logic
//           if (filled < 100) {
//             setFilled((prev) => prev + 2);
//           } else {
//             // Check if there is a next image
//             if (currentIndex < imageData.length - 1) {
//               // Move to the next image
//               nextImage();
//               setFilled(0);
//             } else {
//               // Clear the interval and stop the timer
//               clearInterval(interval);
//               setTimerActive(false);
//             }
//           }
//         }, 100);
//       }
//     };

//     startInterval();

//     // Clean up the interval when the component unmounts
//     return () => clearInterval(interval);
//   }, [currentIndex, dataLoaded, filled, imageData?.length, nextImage]);






//   return (
//     <div className={styles.overlay} onClick={closeModal}>

//       {!isMobile && <div ><img onClick={prevImage} src={LeftMove} alt="" className={styles.move} /></div>}
//       {
//         imageData && imageData.length > 0 ?
//           <>
//             <div className={styles.modal} onClick={(e) => {
//               if (isMobile) {
//                 e.stopPropagation()
//                 handleClick(e)
//               }
//             }} >

//               <div className={styles.prograssbar}>
//                 {
//                   imageData?.map((data, index) => (
//                     <div key={index} className={styles.elementChild} style={{ background: `linear-gradient(to right, rgb(255, 255, 255) ${index < currentIndex ? 100 : index === currentIndex ? `${filled}` : 0}%, rgba(217, 217, 217, 0.5) 0%)` }}></div>
//                   ))
//                 }

//               </div>

//               <div className={styles.remove}>
//                 <img onClick={closeStoryModals} src={Remove} alt="Remove" />
//                 <img onClick={generateShareLink} src={Share} alt="Share" />
//               </div>
//               <div className={styles.imageDiv} style={{ backgroundImage: `linear-gradient(0deg, rgb(0, 0, 0) 20%, rgba(0, 0, 0, 0) 40%), linear-gradient(rgb(0, 0, 0) 14%, rgba(0, 0, 0, 0) 30%), url(${imageData[currentIndex]?.image})` }}>
//                 <ToastContainer
//                   className={`${isMobile ? styles.toastcontainer : styles.desktopContainer}`}
//                   theme='dark'
//                   closeButton={false}

//                   position="top-center"

//                 />
//               </div>
//               <div className={styles.info}>
//                 <h2>{imageData[currentIndex]?.heading}</h2>
//                 <p> {imageData[currentIndex]?.description}</p>
//               </div>
//               <div className={styles.save}>
//                 {
//                   bookBtn === true ? <><img onClick={unbookMarkStory} src={BlueSave} alt="Save" /></> : <> <img onClick={bookMarkStory} src={Save} alt="Save" /></>
//                 }
//                 <div className={styles.likeAndCount}>
//                   {
//                     likeBtn === true ? <><img onClick={unlikeStory} src={Like} alt="Save" /></> : <> <img onClick={likeStory} src={Unlike} alt="Save" /></>
//                   }
//                   <div className={styles.likeCount}>{likeCountNumber}</div>
//                 </div>
//               </div>


//             </div>

//           </>
//           :



//           <>
//             <Loader />


//           </>
//       }
//       {!isMobile && <div>
//         <img onClick={nextImage} src={RighttMove} alt="" className={styles.move} />
//       </div>}
//     </div>
//   )
// }

// export default ShareStoryPage;

















































import { useContext, useEffect, useRef, useState } from "react";
import {
  bookMarkPost,
  getSharePostById,
  likePost,
  trackIsLikePost,
  trackbookMarkPost,
  tracklikeCountkPost,
  unbookMarkPost,
  unlikePost
} from "../../api/post";

import LeftMove from '../../assets/left.png'
import RighttMove from '../../assets/right.png'
import Remove from '../../assets/Crosss.png'
import Share from '../../assets/share.png'
import Save from '../../assets/save.png'
import BlueSave from '../../assets/save1.png'
import Unlike from '../../assets/like.png'
import Like from '../../assets/redlike.png'
import { useParams } from 'react-router-dom';
import { ToastContainer, toast, } from 'react-toastify';
import { AuthContext } from "../../context/authContext";
import { useNavigate } from 'react-router-dom'
import Loader from "../../components/loader/Loader";

function ShareStoryPage({ closeModal }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageData, setImageData] = useState();
  const [filled, setFilled] = useState(0);
  const [likeBtn, setLikeBtn] = useState(false);
  const [likeCountNumber, setLikeCountNumber] = useState(0);
  const [bookBtn, setBookBtn] = useState(false);
  const { postId } = useParams();
  const navigate = useNavigate();
  const { handleLogin, openLoginModal } = useContext(AuthContext);
  const [dataLoaded, setDataLoaded] = useState(false);
  const progressInterval = useRef(null);

  const customToastStyle = {
    backgroundColor: '#333',
    color: '#FF0000',
    fontSize: '20px',
    padding: '10px 20px',
    textAlign: 'center',
    borderRadius: '39px',
    width: '300px',
    height: '36px',
    background: '#D9D9D9',
  };

  const generateShareLink = () => {
    const baseUrl = 'https://swip-tory-six.vercel.app';
    const shareLink = `${baseUrl}/share/${postId}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareLink);
      
      toast('Link copied to clipboard', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: customToastStyle
      });
    } else {
      window.open(shareLink, '_blank');
    }
  };

  const likeStory = async () => {
    const loggedInUser = localStorage.getItem('token');
    if (loggedInUser) {
      try {
        const like = await likePost(postId);
        if (like.success) {
          setLikeBtn(true);
          tracklikeCount();
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      closeStoryModals();
      handleLogin();
      openLoginModal();
    }
  };

  const tracklikeCount = async () => {
    try {
      const like = await tracklikeCountkPost(postId);
      if (like.success) {
        setLikeCountNumber(like.likeCount);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const trackislike = async () => {
    try {
      const like = await trackIsLikePost(postId);
      if (like.success) {
        setLikeBtn(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const unlikeStory = async () => {
    try {
      const like = await unlikePost(postId);
      if (like.success) {
        setLikeBtn(false);
        tracklikeCount();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const trackbookMarkStory = async () => {
    try {
      const track = await trackbookMarkPost(postId);
      if (track.success) {
        setBookBtn(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const bookMarkStory = async () => {
    if (!postId) return;
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const bookMarkPostData = await bookMarkPost(postId);
        if (bookMarkPostData.success) {
          setBookBtn(true);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      closeStoryModals();
      handleLogin();
      openLoginModal();
    }
  };

  const unbookMarkStory = async () => {
    if (!postId) return;
    try {
      const like = await unbookMarkPost(postId);
      if (like.success) {
        setBookBtn(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchJobDetails = async () => {
    if (!postId) return;
    try {
      const result = await getSharePostById(postId);
      setImageData(result?.data);
      setDataLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchJobDetails();
    trackbookMarkStory();
    tracklikeCount();
    trackislike();
  }, []);

  const closeStoryModals = () => {
    navigate('/');
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === imageData?.length - 1) {
        return prevIndex;
      } else {
        return prevIndex + 1;
      }
    });
    setFilled(0);
  };

  const prevImage = () => {
    if (currentIndex !== 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setFilled(0);
    }
  };

  const handleClick = (e) => {
    const { clientX } = e;
    const windowWidth = window.innerWidth;
    const halfWidth = windowWidth / 2;

    if (clientX > halfWidth) {
      nextImage();
    } else {
      if (currentIndex !== 0) {
        prevImage();
      }
    }
  };

  useEffect(() => {
    if (dataLoaded && imageData?.length > 0) {
      progressInterval.current = setInterval(() => {
        if (filled < 100) {
          setFilled((prev) => prev + 2);
        } else {
          if (currentIndex < imageData.length - 1) {
            nextImage();
            setFilled(0);
          } else {
            clearInterval(progressInterval.current);
          }
        }
      }, 100);
    }

    return () => clearInterval(progressInterval.current);
  }, [currentIndex, dataLoaded, filled, imageData?.length]);

  if (!dataLoaded) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
        <Loader />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50" onClick={closeModal}>
      <ToastContainer
        className="z-50"
        theme="dark"
        closeButton={false}
        position="top-center"
      />
      
      {/* Left Navigation Arrow */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 md:block hidden">
        <button 
          onClick={prevImage}
          disabled={currentIndex === 0}
          className={`p-3 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
        >
          <img src={LeftMove} alt="Previous" className="w-6 h-6 filter invert" />
        </button>
      </div>

      {/* Right Navigation Arrow */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 md:block hidden">
        <button 
          onClick={nextImage}
          disabled={currentIndex === imageData?.length - 1}
          className={`p-3 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all ${currentIndex === imageData?.length - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
        >
          <img src={RighttMove} alt="Next" className="w-6 h-6 filter invert" />
        </button>
      </div>

      {/* Main Content */}
      <div 
        className="relative w-full h-full md:w-4/5 md:h-4/5 flex flex-col bg-black rounded-lg overflow-hidden"
        onClick={(e) => {
          if (window.innerWidth <= 768) {
            e.stopPropagation();
            handleClick(e);
          }
        }}
      >
        {/* Progress Bar */}
        <div className="absolute top-4 left-4 right-4 z-20 flex space-x-1">
          {imageData?.map((_, index) => (
            <div key={index} className="h-1 flex-1 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{ width: `${index < currentIndex ? 100 : index === currentIndex ? filled : 0}%` }}
              ></div>
            </div>
          ))}
        </div>

        {/* Header Controls */}
        <div className="absolute top-4 right-4 z-20 flex space-x-3">
          <button 
            onClick={generateShareLink}
            className="p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all"
          >
            <img src={Share} alt="Share" className="w-5 h-5 filter invert" />
          </button>
          <button 
            onClick={closeStoryModals}
            className="p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all"
          >
            <img src={Remove} alt="Close" className="w-5 h-5 filter invert" />
          </button>
        </div>

        {/* Image Content */}
        <div 
          className="flex-1 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${imageData[currentIndex]?.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10 bg-gradient-to-t from-black via-black to-transparent">
          <h2 className="text-2xl font-bold mb-2">{imageData[currentIndex]?.heading}</h2>
          <p className="text-gray-200 mb-4">{imageData[currentIndex]?.description}</p>
          
          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-black bg-opacity-50 rounded-full px-4 py-2">
                {likeBtn ? (
                  <button onClick={unlikeStory} className="focus:outline-none">
                    <img src={Like} alt="Unlike" className="w-6 h-6" />
                  </button>
                ) : (
                  <button onClick={likeStory} className="focus:outline-none">
                    <img src={Unlike} alt="Like" className="w-6 h-6 filter invert" />
                  </button>
                )}
                <span className="text-white font-medium">{likeCountNumber}</span>
              </div>
            </div>
            
            <div className="bg-black bg-opacity-50 rounded-full p-2">
              {bookBtn ? (
                <button onClick={unbookMarkStory} className="focus:outline-none">
                  <img src={BlueSave} alt="Saved" className="w-6 h-6" />
                </button>
              ) : (
                <button onClick={bookMarkStory} className="focus:outline-none">
                  <img src={Save} alt="Save" className="w-6 h-6 filter invert" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Hints */}
        <div className="md:hidden absolute inset-0 flex justify-between items-center pointer-events-none">
          <div className="h-full w-1/3 flex items-center justify-start pl-4">
            {currentIndex !== 0 && (
              <div className="pointer-events-none rounded-full p-2 bg-black bg-opacity-30">
                <img src={LeftMove} alt="Swipe left" className="w-6 h-6 filter invert opacity-70" />
              </div>
            )}
          </div>
          <div className="h-full w-1/3 flex items-center justify-end pr-4">
            {currentIndex !== imageData?.length - 1 && (
              <div className="pointer-events-none rounded-full p-2 bg-black bg-opacity-30">
                <img src={RighttMove} alt="Swipe right" className="w-6 h-6 filter invert opacity-70" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareStoryPage;