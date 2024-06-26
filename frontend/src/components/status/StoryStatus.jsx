import { useContext, useEffect, useRef, useState } from "react";
import styles from './StoryStatus.module.css'
import {
  bookMarkPost, getPostById, likePost, trackIsLikePost, trackbookMarkPost,
  tracklikeCountkPost, unbookMarkPost, unlikePost
} from "../../api/post";

import LeftMove from '../../assets/left.png'
import RighttMove from '../../assets/right.png'
import Remove from '../../assets/Crosss.png'
import Share from '../../assets/share.png'
import Save from '../../assets/save.png'
import BlueSave from '../../assets/save1.png'
import Unlike from '../../assets/like.png'
import Like from '../../assets/redlike.png'
import { ToastContainer, toast, } from 'react-toastify';

import { AuthContext } from "../../context/authContext";
import useMediaQuery from "../../utils/screenSize";
import Loader from "../loader/Loader";


function StoryStatus({ closeModal, postId, closeStoryModal }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timerActive, setTimerActive] = useState(true);
  const [imageData, setImageData] = useState()
  const [filled, setFilled] = useState(0);
  const [likeBtn, setLikeBtn] = useState(false)
  const [likeCountNumber, setLikeCountNumber] = useState(0)
  const [bookBtn, setBookBtn] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false);

  const { handleLogin, openLoginModal } = useContext(AuthContext);
  const isMobile = useMediaQuery('(max-width: 700px)');




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

  //copy share images

  const generateShareLink = () => {
    const baseUrl = 'https://swip-tory-six.vercel.app'; // Replace with your actual domain
    const shareLink = `${baseUrl}/share/${postId}`;


    if (navigator.clipboard) {
      const link = navigator.clipboard.writeText(shareLink);
    
      toast('Link copied to clipboard', {
        position: 'top-center',
        className: 'mobiletoast',
        autoClose: 3000,
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
    const loggedInUser = localStorage.getItem('token')
    if (loggedInUser) {
      try {
        const like = await likePost(postId)
        if (like.success) {
          setLikeBtn(true)
          tracklikeCount();
        }



      } catch (error) {
        return error
      }
    }
    else {
      closeStoryModals()
      handleLogin()
      openLoginModal()

    }


  }

  //track like count

  const tracklikeCount = async () => {

    try {
      const like = await tracklikeCountkPost(postId)
      if (like.success) {
        setLikeCountNumber(like.likeCount)
      }



    } catch (error) {
      return error
    }
  }

  //track like count

  const trackislike = async () => {

    try {
      const like = await trackIsLikePost(postId)
      if (like.success) {
        setLikeBtn(true)
      }



    } catch (error) {
      return error
    }
  }

  //unlike 
  const unlikeStory = async () => {

    try {
      const like = await unlikePost(postId)
      if (like.success) {
        setLikeBtn(false)
        tracklikeCount();
      }



    } catch (error) {
      return error
    }
  }

  //trackBook 
  const trackbookMarkStory = async () => {

    try {
      const track = await trackbookMarkPost(postId)
      if (track.success) {
        setBookBtn(true)

      }

    } catch (error) {
      return error
    }
  }

  //bookmark  story
  const bookMarkStory = async () => {
    if (!postId) return;
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const bookMarkPostData = await bookMarkPost(postId)
     
        if (bookMarkPostData.success) {
          setBookBtn(true)

        }

      } catch (error) {
        return error
      }
    }
    else {
      closeStoryModals()
      handleLogin()
      openLoginModal()
    }

  }

  //bookmark  story
  const unbookMarkStory = async () => {
    if (!postId) return;
    try {
      const like = await unbookMarkPost(postId)
      if (like.success) {
        setBookBtn(false)

      }

    } catch (error) {
      return error
    }
  }


  const fetchJobDetails = async () => {
    if (!postId) return;
    try {
      const result = await getPostById(postId);
      setImageData(result?.data)
      // Set dataLoaded flag to true after data is loaded
      setDataLoaded(true);

    } catch (error) {
      return error

    }

  };
  useEffect(() => {
    fetchJobDetails();
    trackbookMarkStory();
    tracklikeCount();
    trackislike();
  }, []);


  const closeStoryModals = () => {
    closeStoryModal()
  }

  useEffect(() => {

    document.body.style.overflow = 'hidden';


    return () => {
      document.body.style.overflow = '';
    };
  }, []);



  const prevImage = () => {
    if (currentIndex !== 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setFilled(0);
    }
  };



  // const nextImage = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex === imageData?.length - 1 ? imageData?.length : prevIndex + 1));
  //   setFilled(0);
  // }
  const nextImage = () => {
    setCurrentIndex((prevIndex) => {
        // Check if the next index would be out of bounds
        if (prevIndex === imageData?.length - 1) {
            // If so, don't change the index
            return prevIndex;
        } else {
            // Otherwise, increment the index by 1
            return prevIndex + 1;
        }
    });
    setFilled(0);
}



  const handleClick = (e) => {
    const { clientX } = e;
    const windowWidth = window.innerWidth;
    const halfWidth = windowWidth / 2;

    if (clientX > halfWidth) {
      nextImage()
    } else {
      if (currentIndex !== 0) {
        prevImage()


      }
    }
  };



  //next slide function

  useEffect(() => {
    let interval;

    const startInterval = () => {
      if (dataLoaded && imageData?.length > 0) {
        interval = setInterval(() => {
          // Progress bar logic
          if (filled < 100) {
            setFilled((prev) => prev + 2);
          } else {
            // Check if there is a next image
            if (currentIndex < imageData.length - 1) {
              // Move to the next image
              nextImage();
              setFilled(0);
            } else {
              // Clear the interval and stop the timer
              clearInterval(interval);
              setTimerActive(false);
            }
          }
        }, 100);
      }
    };

    startInterval();

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [currentIndex, dataLoaded, filled, imageData?.length, nextImage]);







  return (
    <div className={styles.overlay} onClick={() => {
      closeModal()


    }}    >
      {!isMobile && <div ><img onClick={prevImage} src={LeftMove} alt="" className={styles.move} /></div>}
      {
        imageData && imageData.length > 0 ?
          <>
            <div className={styles.modal} onClick={(e) => {
              if (isMobile) {
                e.stopPropagation()
                handleClick(e)
              }
            }
            } >

              <div className={styles.prograssbar}>
                {
                  imageData?.map((data, index) => (
                    <div key={index} className={styles.elementChild} style={{ background: `linear-gradient(to right, rgb(255, 255, 255) ${index < currentIndex ? 100 : index === currentIndex ? `${filled}` : 0}%, rgba(217, 217, 217, 0.5) 0%)` }}></div>
                  ))
                }

              </div>

              <div className={styles.remove}>
                <img onClick={closeStoryModals} src={Remove} alt="Remove" />
                <img onClick={generateShareLink} src={Share} alt="Share" />
              </div>
              <div className={styles.imageDiv} style={{ backgroundImage: `linear-gradient(0deg, rgb(0, 0, 0) 20%, rgba(0, 0, 0, 0) 40%), linear-gradient(rgb(0, 0, 0) 14%, rgba(0, 0, 0, 0) 30%), url(${imageData[currentIndex]?.image})` }}>
                <ToastContainer
                  className={`${isMobile ? styles.toastcontainer : styles.desktopContainer}`}
                  theme='dark'
                  closeButton={false}

                  position="top-center"

                />
              </div>
              <div className={styles.info}>
                <h2>{imageData[currentIndex]?.heading}</h2>
                <p> {imageData[currentIndex]?.description}</p>
              </div>
              <div className={styles.save}>
                {
                  bookBtn === true ? <><img onClick={unbookMarkStory} src={BlueSave} alt="Save" /></> : <> <img onClick={bookMarkStory} src={Save} alt="Save" /></>
                }
                <div className={styles.likeAndCount}>
                  {
                    likeBtn === true ? <><img onClick={unlikeStory} src={Like} alt="Save" /></> : <> <img onClick={likeStory} src={Unlike} alt="Save" /></>
                  }
                  <div className={styles.likeCount}>{likeCountNumber}</div>
                </div>
              </div>


            </div>

          </>
          :



          <>
            <Loader />


          </>
      }
      {!isMobile && <div>
        <img onClick={nextImage} src={RighttMove} alt="" className={styles.move} />
      </div>}
    </div>
  )
}

export default StoryStatus;





