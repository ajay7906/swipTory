import { useState } from "react";
import styles from './AddStory.module.css'
import { createPost } from "../../api/post";
import { showToast } from "../../utils/showToast";
import useMediaQuery from "../../utils/screenSize";
import RemoveSlide from '../../assets/removeslide.png'
import BigRemove from '../../assets/bigRemove.png'
function AddStory({ closeModal, myStoryEdit }) {
    // State variables
    //const [showModal, setShowModal] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState('');
    const categories = ['food', 'health and fitness', 'travel', 'movies', 'education'];
    const isMobile = useMediaQuery('(max-width: 780px)');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slideStoryInfo, setSlideStoryInfo] = useState(() => {
        if (Array.isArray(myStoryEdit)) {
            return myStoryEdit.map((story) => ({
                heading: story.heading || "",
                description: story.description || "",
                image: story.imageUrl || "",
                chooseCategory: story.category || "",
            }));
        } else {
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
            setCurrentSlide(0); // Reset currentSlide to 0 if the removed slide was the current slide
        } else if (index < currentSlide) {
            setCurrentSlide(currentSlide - 1); // Decrement currentSlide if the removed slide was before the current slide
        }
    };
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


    // Function to handle moving to the previous slide
    // const handlePreviousSlide = () => {
    //     if (currentSlide > 0) {
    //         setCurrentSlide(prevSlide => prevSlide - 1);
    //         console.log(currentSlide);
    //     }
    // };
    // const handleNextSlide = () =>{
    //     if (currentSlide < 5) {
    //         setCurrentSlide(prevSlide => prevSlide + 1);
    //         console.log(currentSlide);
    //     }
    // }
    const handleNextSlide = () => {
        console.log("Current slide before update:", currentSlide);
        if (currentSlide < 5) {
            setCurrentSlide(currentSlide + 1);
        }
        console.log("Current slide after update:", currentSlide);
    };

    const handlePreviousSlide = () => {
        console.log("Current slide before update:", currentSlide);
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
        console.log("Current slide after update:", currentSlide);
    };


    // Function to handle opening the modal
    // const openModal = () => {
    //   setShowModal(true);
    // };

    // Function to handle closing the modal
    // const closeModal = () => {
    //   setShowModal(false);
    // };
    // Inside the setSelectedCategory function
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
        // const isSlideInfoCompletes = slideStoryInfo.every(slide =>

        //     console.log(slide.chooseCategory)

        // );

        if (!isSlideInfoComplete) {
            alert("Please fill in all fields for all slides.");
            return;
        }
        // Process form data (e.g., send it to the server)
        await createPost(slideStoryInfo)
        showToast('post register successful', { type: 'success' });

        // Close the modal after form submission
        closeModal();
    };
    return (
        <div className={styles.overlay} onClick={closeModal}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <span className={styles.close} onClick={closeModal}>X</span>
                <p className={styles.addslidemess}>Add upto 6 slides </p>
                <div className={styles.addStoryForm}>
                    <div className={styles.slideButton}>
                        {slideStoryInfo.map((_, index) => (<>
                            <button key={index} onClick={() => setCurrentSlide(index)}>Slide <br /> {index + 1}   {index >= 3 && (
                                <div className={styles.removeSlide}><img onClick={()=>handleRemoveSlide(index)} src={BigRemove} alt="" /></div>
                            )}  </button>

                        </>

                        ))}
                        <button onClick={handleAddSlide} style={{ display: slideStoryInfo.length < 6 ? 'block' : 'none' }} disabled={slideStoryInfo.length === 6}>Add+</button>


                        {/* remove slide */}

                    </div>
                    <div className={styles.storyInput}>
                        {/* value={username} onChange={(e) => setUsername(e.target.value)} */}
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
                            <input className={styles.description} type="text"
                                placeholder="Description"
                                value={slideStoryInfo[currentSlide]?.description}
                                onChange={(e) => {
                                    const newSlideStoryInfo = [...slideStoryInfo];
                                    newSlideStoryInfo[currentSlide].description = e.target.value;
                                    setSlideStoryInfo(newSlideStoryInfo);
                                }}
                                required />
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
                                // value={slideStoryInfo[currentSlide].chooseCategory}
                                // onChange={(e) => {
                                //     const newSlideStoryInfo = [...slideStoryInfo];
                                //     newSlideStoryInfo[currentSlide].chooseCategory = e.target.value;
                                //     setSlideStoryInfo(newSlideStoryInfo);
                                // }}
                                onChange={(e) => {
                                    const category = e.target.value;
                                    setSelectedCategoryFunction(category); // This updates selectedCategory state
                                    // Note: The setSelectedCategory function will also update chooseCategory for all slides
                                }}
                            // value={selectedCategory}
                            // onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="" disabled >Select category</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /> */}


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





