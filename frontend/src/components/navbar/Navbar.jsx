import { useState } from 'react';
import styles from './Navbar.module.css'
import Register from '../register/Register';
import AddStory from '../addStory/AddStory';

function Navbar() {
    // State variables
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showSignInModal, setShowSignInModal] = useState(false);

    // Function to handle opening the register modal
    const openRegisterModal = () => {
        setShowRegisterModal(true);
      
    };

    // Function to handle opening the sign-in modal
      const openSignInModal = () => {
        setShowSignInModal(true);
      };

    // Function to handle closing the modals
    const closeModal = () => {
        setShowRegisterModal(false);
        setShowSignInModal(false);
    };
    return (
        <>
            <div className={styles.main}>
                <nav className={styles.nav}>
                    <div className={styles.swiptory}>
                        <h2>SwipTory</h2>
                    </div>
                    <div className={styles.register}>
                        <button onClick={openRegisterModal}>Register Now</button>
                        <button className={styles.signin} onClick={openSignInModal}>Sign In</button>
                    </div>
                </nav>
                {/* Register Modal */}

            </div>
            <div className={styles.registerModel}>
                {showRegisterModal && <Register closeModal={closeModal} />}
                {showSignInModal && <AddStory closeModal={closeModal}/>}
            </div>
        </>
    )
}

export default Navbar