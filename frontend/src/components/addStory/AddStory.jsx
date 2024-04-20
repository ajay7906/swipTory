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
        // Process form data (e.g., send it to the server)
        console.log('helooofh');
        console.log('Submitted:', { username, password });
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
                        <button>Slide 1</button>
                        <button>Slide 2</button>
                        <button>Slide 3</button>
                        <button>Add+</button>
                    </div>
                    <div className={styles.storyInput}>
                        <div className={styles.input}>
                            <label htmlFor="">Heading: </label>
                            <input type="text" placeholder="heading" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <div className={styles.input}>
                            <label htmlFor="">Description: </label>
                            <input type="password" placeholder="Description" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className={styles.input}>
                            <label htmlFor="">Image: </label>
                            <input type="password" placeholder="Image" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className={styles.input}>
                            <label>Category:</label>
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
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
                            <button className={styles.previousBtn}>Previous</button>
                            <button className={styles.nextBtn}>Next</button>
                        </div>
                        <div className={styles.postBtnBox}>
                            <button>Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddStory