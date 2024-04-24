import { useEffect, useRef, useState } from "react";
import styles from './StoryStatus.module.css'
import { createPost, getPostById } from "../../api/post";
import { showToast } from "../../utils/showToast";
import LeftMove from '../../assets/left.png'
import RighttMove from '../../assets/right.png'
import Remove from '../../assets/Crosss.png'
import Share from '../../assets/share.png'
import Save from '../../assets/save.png'
import Like from '../../assets/like.png'

import { RotatingLines } from 'react-loader-spinner'

function StoryStatus({ closeModal, postId, closeStoryModal }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timerActive, setTimerActive] = useState(true);
  const [imageData, setImageData] = useState()
  const [filled, setFilled] = useState(0);
  const prevImageDataRef = useRef(null);
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
      setTimeout(() => setFilled(prev => prev += 2), 50)

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
                <h2>{imageData[currentIndex].heading}</h2>
                <p> {imageData[currentIndex].description}</p>
              </div>
              <div className={styles.save}>
                <img src={Save} alt="Save" />
                <img src={Like} className={styles.like} alt="Like" />
              </div>
              <div className={styles.likeCount}>5</div>

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





