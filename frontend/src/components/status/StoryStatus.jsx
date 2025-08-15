// import { useContext, useEffect, useRef, useState } from "react";
// import styles from './StoryStatus.module.css'
// import {
//   bookMarkPost, getPostById, likePost, trackIsLikePost, trackbookMarkPost,
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
// import { ToastContainer, toast, } from 'react-toastify';

// import { AuthContext } from "../../context/authContext";
// import useMediaQuery from "../../utils/screenSize";
// import Loader from "../loader/Loader";


// function StoryStatus({ closeModal, postId, closeStoryModal }) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [timerActive, setTimerActive] = useState(true);
//   const [imageData, setImageData] = useState()
//   const [filled, setFilled] = useState(0);
//   const [likeBtn, setLikeBtn] = useState(false)
//   const [likeCountNumber, setLikeCountNumber] = useState(0)
//   const [bookBtn, setBookBtn] = useState(false)
//   const [dataLoaded, setDataLoaded] = useState(false);

//   const { handleLogin, openLoginModal } = useContext(AuthContext);
//   const isMobile = useMediaQuery('(max-width: 700px)');




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

//   //copy share images

//   const generateShareLink = () => {
//     const baseUrl = 'https://swip-tory-six.vercel.app'; // Replace with your actual domain
//     const shareLink = `${baseUrl}/share/${postId}`;


//     if (navigator.clipboard) {
//       const link = navigator.clipboard.writeText(shareLink);
    
//       toast('Link copied to clipboard', {
//         position: 'top-center',
//         className: 'mobiletoast',
//         autoClose: 3000,
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
//       return error
//     }
//   }

//   //track like count

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
//       return error
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
//     if (token) {
//       try {
//         const bookMarkPostData = await bookMarkPost(postId)
     
//         if (bookMarkPostData.success) {
//           setBookBtn(true)

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
//       const result = await getPostById(postId);
//       setImageData(result?.data)
//       // Set dataLoaded flag to true after data is loaded
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
//     closeStoryModal()
//   }

//   useEffect(() => {

//     document.body.style.overflow = 'hidden';


//     return () => {
//       document.body.style.overflow = '';
//     };
//   }, []);



//   const prevImage = () => {
//     if (currentIndex !== 0) {
//       setCurrentIndex((prevIndex) => prevIndex - 1);
//       setFilled(0);
//     }
//   };



//   // const nextImage = () => {
//   //   setCurrentIndex((prevIndex) => (prevIndex === imageData?.length - 1 ? imageData?.length : prevIndex + 1));
//   //   setFilled(0);
//   // }
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



//   //next slide function

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
//     <div className={styles.overlay} onClick={() => {
//       closeModal()


//     }}    >
//       {!isMobile && <div ><img onClick={prevImage} src={LeftMove} alt="" className={styles.move} /></div>}
//       {
//         imageData && imageData.length > 0 ?
//           <>
//             <div className={styles.modal} onClick={(e) => {
//               if (isMobile) {
//                 e.stopPropagation()
//                 handleClick(e)
//               }
//             }
//             } >

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

// export default StoryStatus;












import { useContext, useEffect, useRef, useState } from "react";
import { 
  bookMarkPost, getPostById, likePost, trackIsLikePost, trackbookMarkPost,
  tracklikeCountkPost, unbookMarkPost, unlikePost
} from "../../api/post";
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from "../../context/authContext";
import useMediaQuery from "../../utils/screenSize";
import Loader from "../loader/Loader";

// Icons
import { FiX, FiShare2, FiBookmark, FiHeart, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { BsBookmarkFill, BsHeartFill } from 'react-icons/bs';

function StoryStatus({ closeStoryModal, postId }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timerActive, setTimerActive] = useState(true);
  const [imageData, setImageData] = useState([]);
  const [filled, setFilled] = useState(0);
  const [likeBtn, setLikeBtn] = useState(false);
  const [likeCountNumber, setLikeCountNumber] = useState(0);
  const [bookBtn, setBookBtn] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const progressRef = useRef(null);
  
  const { handleLogin, openLoginModal } = useContext(AuthContext);
  const isMobile = useMediaQuery('(max-width: 700px)');

  // Toast styling
  const customToastStyle = {
    backgroundColor: '#4A5568',
    color: 'white',
    fontSize: '16px',
    padding: '12px 24px',
    textAlign: 'center',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    maxWidth: '300px',
  };

  // Copy share link
  const generateShareLink = () => {
    const baseUrl = 'https://swip-tory-six.vercel.app';
    const shareLink = `${baseUrl}/share/${postId}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareLink);
      toast('Link copied to clipboard!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        style: customToastStyle
      });
    } else {
      window.open(shareLink, '_blank');
    }
  };

  // Like story functionality
  const likeStory = async () => {
    const loggedInUser = localStorage.getItem('token');
    if (loggedInUser) {
      try {
        await likePost(postId);
        setLikeBtn(true);
        tracklikeCount();
      } catch (error) {
        console.error(error);
      }
    } else {
      closeStoryModal();
      handleLogin();
      openLoginModal();
    }
  };

  // Unlike story functionality
  const unlikeStory = async () => {
    try {
      await unlikePost(postId);
      setLikeBtn(false);
      tracklikeCount();
    } catch (error) {
      console.error(error);
    }
  };

  // Track like count
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

  // Track if user has liked the post
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

  // Track bookmark status
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

  // Bookmark story
  const bookMarkStory = async () => {
    if (!postId) return;
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await bookMarkPost(postId);
        setBookBtn(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      closeStoryModal();
      handleLogin();
      openLoginModal();
    }
  };

  // Unbookmark story
  const unbookMarkStory = async () => {
    if (!postId) return;
    try {
      await unbookMarkPost(postId);
      setBookBtn(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch story data
  const fetchJobDetails = async () => {
    if (!postId) return;
    try {
      const result = await getPostById(postId);
      setImageData(result?.data || []);
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

  // Disable body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Navigation functions
  const prevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setFilled(0);
    }
  };

  const nextImage = () => {
    if (currentIndex < imageData.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setFilled(0);
    }
  };

  // Handle click navigation
  const handleClick = (e) => {
    if (!isMobile) return;
    
    const { clientX } = e;
    const windowWidth = window.innerWidth;
    const halfWidth = windowWidth / 2;
    
    if (clientX > halfWidth) {
      nextImage();
    } else {
      prevImage();
    }
  };

  // Auto progress effect
  useEffect(() => {
    let interval;
    
    if (dataLoaded && imageData.length > 0 && timerActive) {
      interval = setInterval(() => {
        if (filled < 100) {
          setFilled(prev => Math.min(prev + 2, 100));
        } else {
          if (currentIndex < imageData.length - 1) {
            nextImage();
          } else {
            setTimerActive(false);
          }
        }
      }, 100);
    }
    
    return () => clearInterval(interval);
  }, [currentIndex, dataLoaded, filled, imageData.length, timerActive]);

  // Progress bar animation
  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.width = `${filled}%`;
    }
  }, [filled]);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeStoryModal();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, imageData.length]);

  if (!dataLoaded) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
        <Loader />
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
      onClick={closeStoryModal}
    >
      <ToastContainer />
      
      {/* Desktop Navigation Arrows */}
      {!isMobile && imageData.length > 1 && (
        <>
          <button 
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className={`absolute left-4 z-30 p-3 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all ${
              currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
            }`}
            disabled={currentIndex === 0}
          >
            <FiChevronLeft size={24} />
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className={`absolute right-4 z-30 p-3 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all ${
              currentIndex === imageData.length - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
            }`}
            disabled={currentIndex === imageData.length - 1}
          >
            <FiChevronRight size={24} />
          </button>
        </>
      )}
      
      {/* Main Content */}
      <div 
        className={`relative bg-black overflow-hidden rounded-xl ${
          isMobile ? "w-full h-full" : "w-[90%] max-w-3xl h-[90vh]"
        }`}
        onClick={(e) => {
          if (isMobile) e.stopPropagation();
          handleClick(e);
        }}
      >
        {/* Progress Bars */}
        {imageData.length > 1 && (
          <div className="absolute top-4 left-4 right-4 z-30 flex gap-2">
            {imageData.map((_, index) => (
              <div 
                key={index} 
                className="h-1 flex-grow bg-gray-700 rounded-full overflow-hidden"
              >
                <div 
                  ref={index === currentIndex ? progressRef : null}
                  className={`h-full bg-white transition-all duration-100 ${
                    index < currentIndex ? 'w-full' : index === currentIndex ? 'w-0' : 'w-0'
                  }`}
                  style={{
                    width: index < currentIndex ? '100%' : index === currentIndex ? `${filled}%` : '0%'
                  }}
                ></div>
              </div>
            ))}
          </div>
        )}
        
        {/* Top Controls */}
        <div className="absolute top-4 right-4 z-30 flex gap-3">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              generateShareLink();
            }}
            className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all"
          >
            <FiShare2 size={20} />
          </button>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              closeStoryModal();
            }}
            className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all"
          >
            <FiX size={20} />
          </button>
        </div>
        
        {/* Story Image */}
        {imageData.length > 0 ? (
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${imageData[currentIndex]?.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            
            {/* Story Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 drop-shadow-lg">
                {imageData[currentIndex]?.heading}
              </h2>
              <p className="text-gray-200 text-base md:text-lg max-w-2xl drop-shadow-lg">
                {imageData[currentIndex]?.description}
              </p>
            </div>
            
            {/* Bottom Controls */}
            <div className="absolute bottom-4 right-4 z-30 flex items-center gap-4">
              <div className="flex items-center gap-1 bg-black bg-opacity-50 px-3 py-1 rounded-full">
                {bookBtn ? (
                  <BsBookmarkFill 
                    size={20} 
                    className="text-blue-400 cursor-pointer" 
                    onClick={(e) => {
                      e.stopPropagation();
                      unbookMarkStory();
                    }}
                  />
                ) : (
                  <FiBookmark 
                    size={20} 
                    className="text-white cursor-pointer" 
                    onClick={(e) => {
                      e.stopPropagation();
                      bookMarkStory();
                    }}
                  />
                )}
              </div>
              
              <div className="flex items-center gap-2 bg-black bg-opacity-50 px-3 py-1 rounded-full">
                {likeBtn ? (
                  <BsHeartFill 
                    size={20} 
                    className="text-red-500 cursor-pointer" 
                    onClick={(e) => {
                      e.stopPropagation();
                      unlikeStory();
                    }}
                  />
                ) : (
                  <FiHeart 
                    size={20} 
                    className="text-white cursor-pointer" 
                    onClick={(e) => {
                      e.stopPropagation();
                      likeStory();
                    }}
                  />
                )}
                <span className="text-white">{likeCountNumber}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-900">
            <div className="text-center p-8">
              <div className="text-5xl mb-4">📖</div>
              <h2 className="text-2xl font-bold text-white mb-2">Story Not Available</h2>
              <p className="text-gray-400">This story content couldn't be loaded</p>
            </div>
          </div>
        )}
        
        {/* Mobile Navigation Hint */}
        {isMobile && imageData.length > 1 && (
          <div className="absolute inset-0 flex z-10">
            <div 
              className="flex-1 flex items-center justify-start p-4 opacity-0 hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <div className="p-2 rounded-full bg-black bg-opacity-50 text-white">
                <FiChevronLeft size={24} />
              </div>
            </div>
            <div 
              className="flex-1 flex items-center justify-end p-4 opacity-0 hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <div className="p-2 rounded-full bg-black bg-opacity-50 text-white">
                <FiChevronRight size={24} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StoryStatus;
