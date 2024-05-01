
import { useContext, useEffect, useState } from 'react';
import styles from './Navbar.module.css'
import Register from '../register/Register';
import AddStory from '../addStory/AddStory';
import BarImg from '../../assets/bar.png'
import { Link } from 'react-router-dom';
import CrossBtn from '../../assets/cross.png'
import useMediaQuery from '../../utils/screenSize';
import Save from '../../assets/save.png'

import { AuthContext } from '../../context/authContext';

function Navbar() {
  // State variables
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAddStoryModal, setShowAddStoryModal] = useState(false);
  const [showResponsiveModal, setShowResponsiveModal] = useState(false);
 
  const isMobile = useMediaQuery('(max-width: 780px)');
  
  const {isLoggedIns, showLoginModal, closeLoginModal , username ,  logout } = useContext(AuthContext);
 
  
  const openshowAddStoryModalModal = () => {
    setShowAddStoryModal(true);

  };
  const openRegisterModal = () => {
    setShowRegisterModal(true);

  };
  
  const handleLogout = () => {
   
  //  localStorage.removeItem('token');
    setShowProfileModal(false);
    setShowResponsiveModal(!showResponsiveModal);
    logout()
   
//setIsLoggedIn(false);
   

  };

  // Function to handle opening the sign-in modal
  const openSignInModal = () => {
    setShowSignInModal(true);
  };
  useEffect(() => {
    if (showSignInModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showSignInModal]);

  // Function to handle closing the modals
  const closeModal = () => {
    setShowRegisterModal(false);
    setShowSignInModal(false);
    setShowAddStoryModal(false)
    closeLoginModal()
  };
  // Function to handle opening the profile modal
  const openProfileModal = () => {
    setShowProfileModal(true);
  };

  // Function to handle closing the profile modal
  const closeProfileModal = () => {
    setShowProfileModal(false);
  };
  const toggleProfileModal = () => {
    setShowProfileModal(prevState => !prevState);
  };

  const toggleResponsiveModal = () => {
    setShowResponsiveModal(!showResponsiveModal);
  };
  return (
    <>
      <div className={styles.main}>
        <nav className={styles.nav}>
          <div className={styles.swiptory}>
            <h2>SwipTory</h2>
          </div>
          {/* desktop  navigation bar */}
          {
            !isMobile ? (
              <div className={styles.register}>
                {showProfileModal && (
                  <div className={styles.profileModal}>
                    <div className={styles.profileContent}>
                      <h3>{username?.username}</h3>
                      <button onClick={() => {
                        closeProfileModal()
                        handleLogout()
                      }}>Logout</button>
                    </div>
                  </div>
                )}
                {isLoggedIns ? (
                  <>
                    <div className={styles.bookmarksLink}>
                      <img src={Save} alt="" />
                      <Link to='/bookmarks' className={styles.bookMarkLink}>Bookmarks</Link>
                    </div>
                    <button onClick={openshowAddStoryModalModal}>Add Story</button>
                    <div className={styles.profileImg}>
                      <img src="https://swiptory001.netlify.app/static/media/user.5eb483b86d841223e1b4.png" alt="" />

                    </div>
                    <div className={styles.barImgs}>
                      <img src={BarImg} alt="bar" onClick={toggleProfileModal} />

                    </div>
                  </>
                ) : (
                  <>
                    <button className={styles.registerBtn} onClick={openRegisterModal}>Register Now</button>
                    <button className={styles.signin} onClick={openSignInModal}>Sign In</button>
                  </>
                )}
              </div>

            )


              : (
                <div className={styles.barImgs} onClick={toggleResponsiveModal}>
                  <img src={BarImg} alt="" />
                </div>
              )
          }
          {/* <div className={styles.barImgs} onClick={toggleResponsiveModal}>
            <img src={BarImg} alt="" />
          </div> */}
        </nav>
      

      </div>
    
      {

        showResponsiveModal && isMobile ? (
          <div className={styles.mobileResponsiveContainer}>
            {isLoggedIns ? (
              <div className={styles.mobileResponsive}>
                <img className={styles.mobileResponsiveCrossBtn} src={CrossBtn} alt="cross" onClick={toggleResponsiveModal} />
                <div className={styles.profileImg}>
                  <img src="https://swiptory001.netlify.app/static/media/user.5eb483b86d841223e1b4.png" alt="" />

                </div>
                <div className={styles.responsiveNavLink}>
                  <div className={styles.profileContent}>
                    <h1>{username?.username}</h1>
                  </div>
                  <div className={styles.profileContent}>
                    <Link to='/your_story' onClick={toggleResponsiveModal} className={styles.bookmarksLink}>
                      Your Story
                    </Link>
                  </div>

                  <div className={styles.profileContent}>
                    <button onClick={openshowAddStoryModalModal}>Add Story</button>
                  </div>
                  <div className={styles.profileContent}>
                    <div className={styles.bookmarksLink}>
                      <img src={Save} alt="Save Icon" />
                      <Link to='/bookmarks' onClick={toggleResponsiveModal} className={styles.bookMarkLink}> Bookmarks</Link>
                    </div>

                  </div>
                  <div className={styles.profileContent} onClick={() => {
                    handleLogout()
                    closeProfileModal()
                  }}><button>Logout</button></div>
                </div>
              </div>
            ) : (
              <div className={styles.mobileResponsive}>
                <div className={styles.crossResponsive}><img  src={CrossBtn} alt="cross" onClick={toggleResponsiveModal} /></div>
                <div className={styles.withOutLoginBtn}>
                  <button onClick={openRegisterModal}>Register Now</button>
                  <button onClick={openSignInModal}>Sign In</button>
                </div>
              </div>
            )}
          </div>
        ) : <> </>

      }



      <div className={styles.registerModel}>
        {showRegisterModal && <Register closeModal={closeModal} modalName="Register" />}
        {showSignInModal  && <Register closeModal={closeModal} modalName="Login" />}
        {showLoginModal  && <Register closeModal={closeModal} modalName="Login" />}
        {showAddStoryModal && <AddStory closeModal={closeModal} />}

      </div>
    </>
  )
}

export default Navbar 
