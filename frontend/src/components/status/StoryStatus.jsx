import { useEffect, useRef, useState } from "react";
import styles from './StoryStatus.module.css'
import { bookMarkPost, createPost, getPostById, likePost, trackbookMarkPost,
   tracklikeCountkPost, unbookMarkPost, unlikePost } from "../../api/post";
import { showToast } from "../../utils/showToast";
import LeftMove from '../../assets/left.png'
import RighttMove from '../../assets/right.png'
import Remove from '../../assets/Crosss.png'
import Share from '../../assets/share.png'
import Save from '../../assets/save.png'
import BlueSave from '../../assets/save1.png'
import Unlike from '../../assets/like.png'
import Like from '../../assets/redlike.png'

import { RotatingLines } from 'react-loader-spinner'

function StoryStatus({ closeModal, postId, closeStoryModal }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timerActive, setTimerActive] = useState(true);
  const [imageData, setImageData] = useState()
  const [filled, setFilled] = useState(0);
  const [likeBtn, setLikeBtn] = useState(false)
  const [likeCountNumber, setLikeCountNumber] = useState(0)
  const [bookBtn, setBookBtn] = useState(false)
  

  const [bookStory, setBookStory] = useState()
  const prevImageDataRef = useRef(null);

  const likeStory = async () => {

    try {
      const like = await likePost(postId)
      if (like.success) {
        setLikeBtn(true)
      }



    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  }

  //unlike 
  const unlikeStory = async () => {

    try {
      const like = await unlikePost(postId)
      if (like.success) {
        setLikeBtn(false)
      }



    } catch (error) {
      console.log(error);
    }
  }
  console.log(bookStory);
  //trackBook 
  const trackbookMarkStory = async () => {

    try {
      const track = await trackbookMarkPost(postId)
      if (track.success) {
        setBookBtn(true)

      }

    } catch (error) {
      console.log(error);
    }
  }

  //bookmark  story
  const bookMarkStory = async () => {
    if (!postId) return;
    try {
      const bookMarkPostData = await bookMarkPost(postId)
      if (bookMarkPostData.success) {
        setBookBtn(true)

      }

    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  }


  const fetchJobDetails = async () => {
    if (!postId) return console.log('nothing');
    try {
      const result = await getPostById(postId);
      setImageData(result?.data)
      console.log(result.data);

    } catch (error) {
      console.log(error);

    }

  };
  useEffect(() => {
    fetchJobDetails();
    trackbookMarkStory();
    tracklikeCount();
  }, []);


  const closeStoryModals = () => {
    closeStoryModal()
  }

  // useEffect(() => {
  //   if (prevImageDataRef.current !== imageData) {
  //     console.log(imageData);
  //     prevImageDataRef.current = imageData;
  //   }
  // }, [imageData]);


  // console.log(imageData);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === imageData?.length - 1 ? imageData?.length : prevIndex + 1));
    setFilled(0);
  }

  // Function to handle previous image
  const prevImage = () => {

    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
    setFilled(0);
  };

  useEffect(() => {
    if (filled < 100) {
      setTimeout(() => setFilled(prev => prev += 2), 80)

    }
  }, [filled, currentIndex])

  useEffect(() => {

    const timer = setInterval(() => {

      nextImage();
      setFilled(0)
    }, 4000);

    if (currentIndex === imageData?.length - 1) {
      clearInterval(timer);
      setTimerActive(false);
    }
    return () => clearInterval(timer);
  }, [currentIndex, timerActive]);



  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div ><img onClick={prevImage} src={LeftMove} alt="" className={styles.move} /></div>
      {
        imageData && imageData.length > 0 ?
          <>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()} >

              <div className={styles.prograssbar}>
                {
                  imageData?.map((data, index) => (
                    <div key={index} className={styles.elementChild} style={{ background: `linear-gradient(to right, rgb(255, 255, 255) ${index < currentIndex ? 100 : index === currentIndex ? `${filled}` : 0}%, rgba(217, 217, 217, 0.5) 0%)` }}></div>
                  ))
                }

              </div>

              <div className={styles.remove}>
                <img onClick={closeStoryModals} src={Remove} alt="Remove" />
                <img src={Share} alt="Share" />
              </div>
              <div className={styles.imageDiv} style={{ backgroundImage: `linear-gradient(0deg, rgb(0, 0, 0) 20%, rgba(0, 0, 0, 0) 40%), linear-gradient(rgb(0, 0, 0) 14%, rgba(0, 0, 0, 0) 30%), url(${imageData[currentIndex]?.image})` }}>

              </div>
              <div className={styles.info}>
                <h2>{imageData[currentIndex]?.heading}</h2>
                <p> {imageData[currentIndex]?.description}</p>
              </div>
              <div className={styles.save}>
                {
                  bookBtn === true ? <><img onClick={unbookMarkStory} src={BlueSave} alt="Save" /></> : <> <img onClick={bookMarkStory} src={Save} alt="Save" /></>
                }
                {
                  likeBtn === true ? <><img onClick={unlikeStory} src={Like} alt="Save" /></> : <> <img onClick={likeStory} src={Unlike} alt="Save" /></>
                }
              </div>
              <div className={styles.likeCount}>{likeCountNumber}</div>

            </div>

          </>
          :



          <>
            <RotatingLines
              visible={true}
              height="96"
              width="96"
              color="grey"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />


          </>
      }
      <div>
        <img onClick={nextImage} src={RighttMove} alt="" className={styles.move} />
      </div>
    </div>
  )
}

export default StoryStatus;





