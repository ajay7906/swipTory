import { useEffect, useState } from "react";
import styles from './AddStory.module.css'
import { createPost, updatePostById } from "../../api/post";
import { showToast } from "../../utils/showToast";
import useMediaQuery from "../../utils/screenSize"; 
import RemoveSlide from '../../assets/removeslide.png'
import BigRemove from '../../assets/bigRemove.png'
function AddStory({ closeModal, myStoryEdit, myStoryHomeEdits, postId }) {
   
    console.log(postId);
    const [selectedCategory, setSelectedCategory] = useState('');
    const categories = ['Fruits', 'Sports', 'World', 'India', 'Education'];
    const isMobile = useMediaQuery('(max-width: 780px)');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [previousSlide, setPreviousSlide] = useState(0)
    const [activeSlideIndex, setActiveSlideIndex] = useState(currentSlide);
    
    const [slideStoryInfo, setSlideStoryInfo] = useState(() => {
        if (Array.isArray(myStoryEdit)) {
            return myStoryEdit.map((story) => ({
                heading: story.heading || "",
                description: story.description || "",
                image: story.image || "",
                chooseCategory: story.chooseCategory || "",

            }));

        }



        else if (myStoryHomeEdits && Array.isArray(myStoryHomeEdits)) {
            return myStoryHomeEdits.map((story) => ({
                heading: story.heading || "",
                description: story.description || "",
                image: story.image || "",
                chooseCategory: story.chooseCategory || "",
            }));
        }




        else {
            return [
                {
                    heading: "",
                    description: "",
                    image: "",
                    chooseCategory: "",
                },
                {
                    heading: "",
                    description: "",
                    image: "",
                    chooseCategory: "",
                },
                {
                    heading: "",
                    description: "",
                    image: "",
                    chooseCategory: "",
                },
            ];
        }
    });
   
    
    //handle remove slide
    const handleRemoveSlide = (index) => {
        const updatedSlideStoryInfo = slideStoryInfo.filter((_, i) => i !== index);

        setSlideStoryInfo(updatedSlideStoryInfo);

      if (index === currentSlide) {
            setCurrentSlide(0);
         
          
        } else if (index < currentSlide) {
            setCurrentSlide(currentSlide - 1);
           
        }
    }






    // Function to handle adding a new slide data object
    const handleAddSlide = () => {
        if (slideStoryInfo.length < 6) {
            setSlideStoryInfo(prevState => [
                ...prevState,
                {
                    heading: "",
                    description: "",
                    image: "",
                    chooseCategory: selectedCategory
                }
            ]);
            setCurrentSlide(slideStoryInfo.length);
        }
    };

  //handle next slide
    const handleNextSlide = () => {
        console.log("Current slide before update:", currentSlide);
        if (currentSlide < slideStoryInfo.length - 1) {
            setCurrentSlide(currentSlide + 1);

        }
        console.log("Current slide after update:", currentSlide);
    };
//handle previous slide
    const handlePreviousSlide = () => {
        console.log("Current slide before update:", currentSlide);
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);

        }
        console.log("Current slide after update:", currentSlide);
    };





    const setSelectedCategoryFunction = (category) => {
        setSelectedCategory(category);
        // Update the category for all slides
        const updatedSlideStoryInfo = slideStoryInfo.map(slide => ({
            ...slide,
            chooseCategory: category
        }));
        setSlideStoryInfo(updatedSlideStoryInfo);
    };
   







    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if all slide fields are filled
        const isSlideInfoComplete = slideStoryInfo.every((slide, index) =>
            slide.heading && slide.description && slide.image && slide.chooseCategory
           
        );
       console.log(slideStoryInfo);
        if (!isSlideInfoComplete) {
           alert('fill all the filled')
            return;
        }




        if (Array.isArray(myStoryEdit)) {
            await updatePostById(postId, slideStoryInfo)
            showToast('post update successful', { type: 'success' });
        }
       
        else if (Array.isArray(myStoryHomeEdits)) {
            await updatePostById(postId, slideStoryInfo)
            showToast('post update successful', { type: 'success' });
        }





        else {
            // Process form data (e.g., send it to the server)
            await createPost(slideStoryInfo)
            showToast('post register successful', { type: 'success' });
        }

        // Close the modal after form submission
        closeModal();
    };


    useEffect(() => {
        // Add class to body when modal is open
        document.body.style.overflow = 'hidden';

        // Remove class from body when component unmounts
        return () => {
            document.body.style.overflow = '';
        };
    }, []);


    return (
        <div className={styles.overlay} onClick={closeModal}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <span className={styles.close} onClick={closeModal}>X</span>
                {!isMobile && <p className={styles.addslidemess}>Add upto 6 slides </p>}
                {isMobile && <div className={styles.addlinesmobile}><p >Add story to feed</p></div>}
                <div className={styles.addStoryForm}>

                    <div className={styles.slideButton}>

                        {slideStoryInfo.map((_, index) => (<>
                            <button key={index} className={`${styles.slideButton} ${(currentSlide === index) ? styles.activeButton : ''}`} onClick={() => { setCurrentSlide(index); }}> <div className={styles.mobileSlide}>Slide<br /> {index + 1}</div> {index >= 3 && (
                                <div className={styles.removeSlide}><img onClick={() => { handleRemoveSlide(index); }} src={BigRemove} alt="" /></div>

                            )}  </button>

                        </>

                        ))}
                        <button onClick={handleAddSlide} style={{ display: slideStoryInfo.length < 6 ? 'block' : 'none' }} disabled={slideStoryInfo.length === 6}>Add+</button>


                       

                    </div>
                    <div className={styles.storyInput}>

                      
                        <div className={styles.input}>
                            <label htmlFor="">Heading: </label>
                            <input type="text"
                                placeholder="heading"
                                required
                                value={slideStoryInfo[currentSlide]?.heading}
                                onChange={(e) => {
                                    const newSlideStoryInfo = [...slideStoryInfo];
                                    newSlideStoryInfo[currentSlide].heading = e.target.value;
                                    setSlideStoryInfo(newSlideStoryInfo);
                                }}
                            />
                        </div>

                        <div className={styles.input}>
                            <label htmlFor="">Description: </label>
                            {/* <input className={styles.description} type="text"
                                placeholder="Description"
                                value={slideStoryInfo[currentSlide]?.description}
                                onChange={(e) => {
                                    const newSlideStoryInfo = [...slideStoryInfo];
                                    newSlideStoryInfo[currentSlide].description = e.target.value;
                                    setSlideStoryInfo(newSlideStoryInfo);
                                }}
                                required /> */}
                            <textarea className={styles.description}
                                placeholder="Description"
                                value={slideStoryInfo[currentSlide]?.description}
                                onChange={(e) => {
                                    const newSlideStoryInfo = [...slideStoryInfo];
                                    newSlideStoryInfo[currentSlide].description = e.target.value;
                                    setSlideStoryInfo(newSlideStoryInfo);
                                }}
                                required
                            >

                            </textarea>
                        </div>
                        <div className={styles.input}>
                            <label htmlFor="">Image: </label>
                            <input type="text"
                                placeholder="Image"
                                value={slideStoryInfo[currentSlide]?.image}
                                onChange={(e) => {
                                    const newSlideStoryInfo = [...slideStoryInfo];
                                    newSlideStoryInfo[currentSlide].image = e.target.value;
                                    setSlideStoryInfo(newSlideStoryInfo);
                                }}
                                required />
                        </div>
                        <div className={styles.input}>
                            <label>Category:</label>
                            <select
                                
                                className="customSelect"
                                onChange={(e) => {
                                    const category = e.target.value;
                                    setSelectedCategoryFunction(category); // This updates selectedCategory state
                                    // Note: The setSelectedCategory function will also update chooseCategory for all slides
                                }}
                           
                            >
                                <option value="" disabled >Select category</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat} selected={cat === slideStoryInfo[currentSlide]?.chooseCategory || cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        


                    </div>

                </div>
                <div className={styles.postSlideBtn}>
                    {
                        !isMobile ?
                            <> <div className={styles.previousBtnBox}>
                                <button onClick={handlePreviousSlide} disabled={currentSlide === 0} className={styles.previousBtn}>Previous</button>
                                <button onClick={handleNextSlide} className={styles.nextBtn}>Next</button>
                            </div></> :
                            <> </>
                    }
                    <div className={styles.postBtnBox}>
                        <button onClick={handleSubmit}>Post</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddStory





