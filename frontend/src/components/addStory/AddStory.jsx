import { useState } from "react";
import styles from './AddStory.module.css'

function AddStory({ closeModal }) {
    // State variables
    //const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState('');
    // const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [category, setCategory] = useState('');
    const categories = ['food', 'health and fitness', 'travel', 'movies', 'education'];
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slideStoryInfo, setSlideStoryInfo] = useState([
        {
            heading: "",
            description: "",
            image: "",
            chooseCategory: ""
        },
        {
            heading: "",
            description: "",
            image: "",
            chooseCategory: ""
        },
        {
            heading: "",
            description: "",
            image: "",
            chooseCategory: ""
        }

    ])
    // Function to handle adding a new slide data object
    const handleAddSlide = () => {
        if (slideStoryInfo.length < 5) {
            setSlideStoryInfo(prevState => [
                ...prevState,
                {
                    heading: "",
                    description: "",
                    image: "",
                    chooseCategory: ""
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

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if all slide fields are filled
        const isSlideInfoComplete = slideStoryInfo.every(slide =>
            slide.heading && slide.description && slide.image && slide.chooseCategory
        );
        if (!isSlideInfoComplete) {
            alert("Please fill in all fields for all slides.");
            return;
        }
        // Process form data (e.g., send it to the server)
        console.log(slideStoryInfo);
        
       
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
                        {slideStoryInfo.map((_, index) => (
                            <button key={index} onClick={() => setCurrentSlide(index)}>Slide {index + 1}</button>
                        ))}
                        <button onClick={handleAddSlide} disabled={slideStoryInfo.length === 6}>Add+</button>
                    </div>
                    <div className={styles.storyInput}>
                        {/* value={username} onChange={(e) => setUsername(e.target.value)} */}
                        <div className={styles.input}>
                            <label htmlFor="">Heading: </label>
                            <input type="text"
                                placeholder="heading"
                                required
                                value={slideStoryInfo[currentSlide].heading}
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
                                value={slideStoryInfo[currentSlide].description}
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
                                value={slideStoryInfo[currentSlide].image}
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
                                value={slideStoryInfo[currentSlide].chooseCategory}
                                onChange={(e) => {
                                    const newSlideStoryInfo = [...slideStoryInfo];
                                    newSlideStoryInfo[currentSlide].chooseCategory = e.target.value;
                                    setSlideStoryInfo(newSlideStoryInfo);
                                }}
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
                    <div className={styles.postSlideBtn}>
                        <div className={styles.previousBtnBox}>
                            <button onClick={handlePreviousSlide} disabled={currentSlide === 0} className={styles.previousBtn}>Previous</button>
                            <button onClick={handleNextSlide} className={styles.nextBtn}>Next</button>
                        </div>
                        <div className={styles.postBtnBox}>
                            <button onClick={handleSubmit}>Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddStory





