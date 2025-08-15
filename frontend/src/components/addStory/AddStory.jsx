// import { useContext, useEffect, useState } from "react";
// import styles from './AddStory.module.css'
// import { createPost, updatePostById } from "../../api/post";
// import { showToast } from "../../utils/showToast";
// import useMediaQuery from "../../utils/screenSize";
// import { ColorRing } from 'react-loader-spinner'
// import BigRemove from '../../assets/bigRemove.png'
// import { ToastContainer, toast } from 'react-toastify';
// import { AuthContext } from "../../context/authContext";
// function AddStory({ closeModal, myStoryEdit, myStoryHomeEdits, postId }) {

//     const [loading, setLoading] = useState(false);
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const categories = ['Fruits', 'Sports', 'World', 'India', 'Education'];
//     const isMobile = useMediaQuery('(max-width: 780px)');
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const { upDateNewStory } = useContext(AuthContext);


//     const [slideStoryInfo, setSlideStoryInfo] = useState(() => {
//         if (Array.isArray(myStoryEdit)) {
//             return myStoryEdit.map((story) => ({
//                 heading: story.heading || "",
//                 description: story.description || "",
//                 image: story.image || "",
//                 chooseCategory: story.chooseCategory || "",

//             }));

//         }



//         else if (myStoryHomeEdits && Array.isArray(myStoryHomeEdits)) {
//             return myStoryHomeEdits.map((story) => ({
//                 heading: story.heading || "",
//                 description: story.description || "",
//                 image: story.image || "",
//                 chooseCategory: story.chooseCategory || "",
//             }));
//         }




//         else {
//             return [
//                 {
//                     heading: "",
//                     description: "",
//                     image: "",
//                     chooseCategory: "",
//                 },
//                 {
//                     heading: "",
//                     description: "",
//                     image: "",
//                     chooseCategory: "",
//                 },
//                 {
//                     heading: "",
//                     description: "",
//                     image: "",
//                     chooseCategory: "",
//                 },
//             ];
//         }
//     });


//     //handle remove slide

//     const handleRemoveSlide = (index) => {

//         const updatedSlideStoryInfo = slideStoryInfo.filter((_, i) => i !== index);
//         setSlideStoryInfo(updatedSlideStoryInfo)



//         if (index === currentSlide) {
//             // setCurrentSlide(0);
//             // handlePreviousSlide()
//             // setCurrentSlide(Math.max(currentSlide - 1, 0));
//             setCurrentSlide(currentSlide - 1);


//         } else if (index < currentSlide) {
//             setCurrentSlide(currentSlide - 1);


//         }

//     }





//     // Function to handle adding a new slide data object
//     const handleAddSlide = () => {
//         if (slideStoryInfo.length < 6) {
//             setSlideStoryInfo(prevState => [
//                 ...prevState,
//                 {
//                     heading: "",
//                     description: "",
//                     image: "",
//                     chooseCategory: selectedCategory
//                 }
//             ]);
//             setCurrentSlide(slideStoryInfo.length);
//         }
//     };

//     //handle next slide
//     const handleNextSlide = () => {

//         if (currentSlide < slideStoryInfo.length - 1) {
//             setCurrentSlide(currentSlide + 1);

//         }

//     };
//     //handle previous slide
//     const handlePreviousSlide = () => {

//         if (currentSlide > 0) {
//             setCurrentSlide(currentSlide - 1);

//         }

//     };





//     const setSelectedCategoryFunction = (category) => {
//         setSelectedCategory(category);
//         // Update the category for all slides
//         const updatedSlideStoryInfo = slideStoryInfo.map(slide => ({
//             ...slide,
//             chooseCategory: category
//         }));
//         setSlideStoryInfo(updatedSlideStoryInfo);
//     };








//     // Function to handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // Check if all slide fields are filled
//         setLoading(true)
//         const isSlideInfoComplete = slideStoryInfo.every((slide, index) =>
//             slide.heading && slide.description && slide.image && slide.chooseCategory

//         );

//         if (!isSlideInfoComplete) {

//             showToast('Please fill all the filled ', { type: 'error' })
            
           
//             setLoading(false)
//             return;
//         }




//         if (Array.isArray(myStoryEdit)) {
//             await updatePostById(postId, slideStoryInfo)
//             upDateNewStory()
//             showToast('post update successful', { type: 'success' });
//             setLoading(false)
           
//         }

//         else if (Array.isArray(myStoryHomeEdits)) {
//             await updatePostById(postId, slideStoryInfo)
//             upDateNewStory()
//             showToast('post update successful', { type: 'success' });
//             setLoading(false)
//         }





//         else {
//             // Process form data (e.g., send it to the server)

//             await createPost(slideStoryInfo) 
//             upDateNewStory()
//             showToast('post register successful', { type: 'success' });
//             setLoading(false)
//         }

//         // Close the modal after form submission
//         closeModal();
//     };


//     useEffect(() => {

//         document.body.style.overflow = 'hidden';


//         return () => {
//             document.body.style.overflow = '';
//         };
//     }, []);


//     return (
//         <div className={styles.overlay} onClick={closeModal}>
//             <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
//                 <span className={styles.close} onClick={closeModal}>X</span>
//                 {!isMobile && <p className={styles.addslidemess}>Add upto 6 slides </p>}
//                 {isMobile && <div className={styles.addlinesmobile}><p >Add story to feed</p></div>}
//                 <div className={styles.addStoryForm}>

//                     <div className={styles.slideButton}>

//                         {slideStoryInfo.map((_, index) => (<>
//                             <button key={index} className={`${styles.slideButton} ${(currentSlide === index) ? styles.activeButton : ''}`} onClick={() => { setCurrentSlide(index); }}> <div className={styles.mobileSlide}>Slide<br /> {index + 1}</div> {index >= 3 && (
//                                 <div className={styles.removeSlide}><img onClick={(e) => { handleRemoveSlide(index); e.stopPropagation() }} src={BigRemove} alt="" /></div>

//                             )}  </button>

//                         </>

//                         ))}
//                         <button onClick={handleAddSlide} style={{ display: slideStoryInfo.length < 6 ? 'block' : 'none' }} disabled={slideStoryInfo.length === 6}>Add+</button>




//                     </div>
//                     <div className={styles.storyInput}>


//                         <div className={styles.input}>
//                             <label htmlFor="">Heading: </label>
//                             <input type="text"
//                                 placeholder="heading"
//                                 required
//                                 value={slideStoryInfo[currentSlide]?.heading}
//                                 onChange={(e) => {
//                                     const newSlideStoryInfo = [...slideStoryInfo];
//                                     newSlideStoryInfo[currentSlide].heading = e.target.value;
//                                     setSlideStoryInfo(newSlideStoryInfo);
//                                 }}
//                             />
//                         </div>

//                         <div className={styles.input}>
//                             <label htmlFor="">Description: </label>
                          
//                             <textarea className={styles.description}
//                                 placeholder="Description"
//                                 value={slideStoryInfo[currentSlide]?.description}
//                                 onChange={(e) => {
//                                     const newSlideStoryInfo = [...slideStoryInfo];
//                                     newSlideStoryInfo[currentSlide].description = e.target.value;
//                                     setSlideStoryInfo(newSlideStoryInfo);
//                                 }}
//                                 required
//                             >

//                             </textarea>
//                         </div>
//                         <div className={styles.input}>
//                             <label htmlFor="">Image: </label>
//                             <input type="text"
//                                 placeholder="Image"
//                                 value={slideStoryInfo[currentSlide]?.image}
//                                 onChange={(e) => {
//                                     const newSlideStoryInfo = [...slideStoryInfo];
//                                     newSlideStoryInfo[currentSlide].image = e.target.value;
//                                     setSlideStoryInfo(newSlideStoryInfo);
//                                 }}
//                                 required />
//                         </div>
//                         <div className={styles.input}>
//                             <label>Category:</label>
//                             <select

//                                 className="customSelect"
//                                 onChange={(e) => {
//                                     const category = e.target.value;
//                                     setSelectedCategoryFunction(category); // This updates selectedCategory state
//                                     // Note: The setSelectedCategory function will also update chooseCategory for all slides
//                                 }}
//                                 value={slideStoryInfo[currentSlide]?.chooseCategory}

//                             >
//                                 <option value="" disabled >Select category</option>
//                                 {categories.map((cat) => (
                                    
//                                     <option key={cat} value={cat} selected={cat}>
//                                         {cat}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>




//                     </div>

//                 </div>
//                 <div className={styles.postSlideBtn}>
//                     {
//                         !isMobile ?
//                             <> <div className={styles.previousBtnBox}>
//                                 <button onClick={handlePreviousSlide} disabled={currentSlide === 0} className={styles.previousBtn}>Previous</button>
//                                 <button onClick={handleNextSlide} className={styles.nextBtn}>Next</button>
//                             </div></> :
//                             <> </>
//                     }
//                     <div className={styles.postBtnBox}>
//                         {/* <button onClick={handleSubmit}>Post</button> */}
//                         {loading ? ( // Display loading indicator if loading is true
//                             <button disabled style={{ background: '#ff7373' }}>
//                                 <ColorRing 
//                                     className="loader"
//                                     visible={true}
//                                     height="50"
//                                     width="50"
//                                     ariaLabel="color-ring-loading"
//                                     wrapperStyle={{}}
//                                     wrapperClass="color-ring-wrapper"
//                                     colors={['#e15b64', '#FFFF00', '#f8b26a', '#00FF00', '#849b87']}
//                                 />
//                             </button>
//                         ) : (
//                             <button onClick={handleSubmit}>Post</button>
//                         )}
//                     </div>
//                 </div>
//             </div>
//             <ToastContainer

//                 theme='dark'
//                 transition:Bounce
//                 position="top-center"

//             />
//         </div>
//     )
// }

// export default AddStory





import { useContext, useEffect, useState } from "react";
import { createPost, updatePostById } from "../../api/post";
import { showToast } from "../../utils/showToast";
import useMediaQuery from "../../utils/screenSize";
import { ColorRing } from 'react-loader-spinner'
import BigRemove from '../../assets/bigRemove.png'
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from "../../context/authContext";
import { useNavigate } from 'react-router-dom';








function AddStoryPage({ myStoryEdit, myStoryHomeEdits, postId }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const categories = ['Fruits', 'Sports', 'World', 'India', 'Education'];
    const isMobile = useMediaQuery('(max-width: 780px)');
    const [currentSlide, setCurrentSlide] = useState(0);
    const { upDateNewStory } = useContext(AuthContext);

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
                { heading: "", description: "", image: "", chooseCategory: "" },
                { heading: "", description: "", image: "", chooseCategory: "" },
                { heading: "", description: "", image: "", chooseCategory: "" },
            ];
        }
    });

    const handleRemoveSlide = (index) => {
        const updatedSlideStoryInfo = slideStoryInfo.filter((_, i) => i !== index);
        setSlideStoryInfo(updatedSlideStoryInfo);
        
        if (index === currentSlide) {
            setCurrentSlide(currentSlide - 1);
        } else if (index < currentSlide) {
            setCurrentSlide(currentSlide - 1);
        }
    }

    const handleAddSlide = () => {
        if (slideStoryInfo.length < 6) {
            setSlideStoryInfo(prevState => [
                ...prevState,
                { heading: "", description: "", image: "", chooseCategory: selectedCategory }
            ]);
            setCurrentSlide(slideStoryInfo.length);
        }
    };

    const handleNextSlide = () => {
        if (currentSlide < slideStoryInfo.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const handlePreviousSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const setSelectedCategoryFunction = (category) => {
        setSelectedCategory(category);
        const updatedSlideStoryInfo = slideStoryInfo.map(slide => ({
            ...slide,
            chooseCategory: category
        }));
        setSlideStoryInfo(updatedSlideStoryInfo);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const isSlideInfoComplete = slideStoryInfo.every((slide, index) =>
            slide.heading && slide.description && slide.image && slide.chooseCategory
        );

        if (!isSlideInfoComplete) {
            showToast('Please fill all the fields', { type: 'error' });
            setLoading(false);
            return;
        }

        try {
            if (Array.isArray(myStoryEdit)) {
                await updatePostById(postId, slideStoryInfo);
                upDateNewStory();
                showToast('Post updated successfully', { type: 'success' });
            }
            else if (Array.isArray(myStoryHomeEdits)) {
                await updatePostById(postId, slideStoryInfo);
                upDateNewStory();
                showToast('Post updated successfully', { type: 'success' });
            }
            else {
                await createPost(slideStoryInfo);
                upDateNewStory();
                showToast('Post created successfully', { type: 'success' });
            }
            
            // Navigate back after successful submission
            navigate(-1);
        } catch (error) {
            showToast('Error processing your request', { type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4 md:p-8  flex justify-center">
            <div className="max-w-7xl w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-indigo-600 text-white p-6 flex justify-between items-center">
                    <h1 className="text-2xl md:text-3xl font-bold">
                        {myStoryEdit || myStoryHomeEdits ? "Edit Story" : "Create New Story"}
                    </h1>
                    <button 
                        onClick={() => navigate(-1)}
                        className="bg-white text-indigo-600 font-bold rounded-full w-10 h-10 flex items-center justify-center hover:bg-indigo-100 transition-colors"
                    >
                        X
                    </button>
                </div>
                
                {/* Slide Navigation */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-wrap gap-3 md:gap-4">
                        {slideStoryInfo.map((_, index) => (
                            <button 
                                key={index} 
                                className={`
                                    relative flex flex-col items-center justify-center w-16 h-16 md:w-20 md:h-20 
                                    rounded-lg shadow-md transition-all
                                    ${currentSlide === index 
                                        ? "bg-indigo-100 border-2 border-indigo-500 text-indigo-700" 
                                        : "bg-white border border-gray-200 text-gray-700"}
                                `}
                                onClick={() => setCurrentSlide(index)}
                            >
                                <span className="text-sm font-semibold">Slide</span>
                                <span className="text-lg font-bold">{index + 1}</span>
                                
                                {index >= 3 && (
                                    <div className="absolute -top-2 -right-2 bg-red-500 rounded-full w-6 h-6 flex items-center justify-center">
                                        <img 
                                            src={BigRemove} 
                                            alt="Remove" 
                                            className="w-3 h-3 invert"
                                            onClick={(e) => { 
                                                handleRemoveSlide(index); 
                                                e.stopPropagation();
                                            }} 
                                        />
                                    </div>
                                )}
                            </button>
                        ))}
                        
                        {slideStoryInfo.length < 6 && (
                            <button 
                                onClick={handleAddSlide}
                                className="w-16 h-16 md:w-20 md:h-20 flex flex-col items-center justify-center 
                                          bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg
                                          hover:bg-gray-200 transition-colors text-gray-600"
                            >
                                <span className="text-2xl">+</span>
                                <span className="text-xs mt-1">Add</span>
                            </button>
                        )}
                    </div>
                    
                    <p className="mt-4 text-sm text-gray-500">
                        Add up to 6 slides | Current: {slideStoryInfo.length}/6
                    </p>
                </div>
                
                {/* Form Section */}
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Heading */}
                            <div className="space-y-2">
                                <label className="block text-gray-700 font-medium">Heading</label>
                                <input
                                    type="text"
                                    placeholder="Enter heading"
                                    required
                                    value={slideStoryInfo[currentSlide]?.heading || ""}
                                    onChange={(e) => {
                                        const newSlideStoryInfo = [...slideStoryInfo];
                                        newSlideStoryInfo[currentSlide].heading = e.target.value;
                                        setSlideStoryInfo(newSlideStoryInfo);
                                    }}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            
                            {/* Category */}
                            <div className="space-y-2">
                                <label className="block text-gray-700 font-medium">Category</label>
                                <select
                                    value={slideStoryInfo[currentSlide]?.chooseCategory || ""}
                                    onChange={(e) => setSelectedCategoryFunction(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="" disabled>Select category</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            
                            {/* Description */}
                            <div className="md:col-span-2 space-y-2">
                                <label className="block text-gray-700 font-medium">Description</label>
                                <textarea
                                    placeholder="Enter description"
                                    value={slideStoryInfo[currentSlide]?.description || ""}
                                    onChange={(e) => {
                                        const newSlideStoryInfo = [...slideStoryInfo];
                                        newSlideStoryInfo[currentSlide].description = e.target.value;
                                        setSlideStoryInfo(newSlideStoryInfo);
                                    }}
                                    required
                                    rows="4"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            
                            {/* Image URL */}
                            <div className="md:col-span-2 space-y-2">
                                <label className="block text-gray-700 font-medium">Image URL</label>
                                <input
                                    type="text"
                                    placeholder="Enter image URL"
                                    value={slideStoryInfo[currentSlide]?.image || ""}
                                    onChange={(e) => {
                                        const newSlideStoryInfo = [...slideStoryInfo];
                                        newSlideStoryInfo[currentSlide].image = e.target.value;
                                        setSlideStoryInfo(newSlideStoryInfo);
                                    }}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            
                            {/* Image Preview */}
                            {slideStoryInfo[currentSlide]?.image && (
                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 font-medium mb-2">Image Preview</label>
                                    <div className="border border-gray-300 rounded-lg p-2 h-64 flex items-center justify-center">
                                        <img 
                                            src={slideStoryInfo[currentSlide].image} 
                                            alt="Preview" 
                                            className="max-h-60 max-w-full object-contain"
                                            onError={(e) => e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found"}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* Navigation and Submit Buttons */}
                        <div className="flex flex-col md:flex-row justify-between gap-4 pt-4 border-t border-gray-200">
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={handlePreviousSlide}
                                    disabled={currentSlide === 0}
                                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                                        currentSlide === 0 
                                            ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
                                            : "bg-green-500 text-white hover:bg-green-600"
                                    }`}
                                >
                                    Previous
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNextSlide}
                                    disabled={currentSlide === slideStoryInfo.length - 1}
                                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                                        currentSlide === slideStoryInfo.length - 1 
                                            ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
                                            : "bg-blue-500 text-white hover:bg-blue-600"
                                    }`}
                                >
                                    Next
                                </button>
                            </div>
                            
                            <button
                                type="submit"
                                className={`px-8 py-3 rounded-lg font-medium text-white transition-colors ${
                                    loading 
                                        ? "bg-indigo-400" 
                                        : "bg-indigo-600 hover:bg-indigo-700"
                                }`}
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <ColorRing 
                                            visible={true}
                                            height="30"
                                            width="30"
                                            colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                                        />
                                    </div>
                                ) : myStoryEdit || myStoryHomeEdits ? "Update Story" : "Publish Story"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            
          
        </div>
        <ToastContainer 
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default AddStoryPage;