import { useEffect, useState } from 'react';
import styles from './Navbar.module.css'
import Register from '../register/Register';
import AddStory from '../addStory/AddStory';
import BarImg from '../../assets/bar.png'
import { Link } from 'react-router-dom';
import CrossBtn from '../../assets/cross.png'
import useMediaQuery from '../../utils/screenSize';

function Navbar() {
  // State variables
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAddStoryModal, setShowAddStoryModal] = useState(false);
  const [showResponsiveModal, setShowResponsiveModal] = useState(false);
  const isMobile = useMediaQuery('(max-width: 780px)');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Update isLoggedIn based on whether token exists
  }, []);

  // Function to handle opening the register modal
  const openshowAddStoryModalModal = () => {
    setShowAddStoryModal(true);

  };
  const openRegisterModal = () => {
    setShowRegisterModal(true);

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
                      <h3>User Name</h3>
                      <button onClick={closeProfileModal}>Logout</button>
                    </div>
                  </div>
                )}
                {isLoggedIn ? (
                  <>
                    <Link className={styles.bookmarksLink}>Bookmarks</Link>
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
                    <button onClick={openRegisterModal}>Register Now</button>
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
        {/* Register Modal */}

      </div>
      {/* Mobile responsive modal */}
      {
      
      showResponsiveModal && isMobile ? (
        <div className={styles.mobileResponsiveContainer}>
          {isLoggedIn ? (
            <div className={styles.mobileResponsive}>
              <img src={CrossBtn} alt="cross" onClick={toggleResponsiveModal} />
              <div className={styles.profileImg}>
                <img src="https://swiptory001.netlify.app/static/media/user.5eb483b86d841223e1b4.png" alt="" />

              </div>
              <div className={styles.responsiveNavLink}>
                <div className={styles.profileContent}>
                  <h1>User</h1>
                </div>
                <div className={styles.profileContent}>
                  <button>
                    Your Profile
                  </button>
                </div>

                <div className={styles.profileContent}>
                  <button>User</button>
                </div>
                <div className={styles.profileContent}>
                  <button>User</button>
                </div>
                <div className={styles.profileContent} onClick={closeProfileModal}><button>Logout</button></div>
              </div>
            </div>
          ) : (
            <div className={styles.mobileResponsive}>
              <div onClick={openRegisterModal}>Register Now</div>
              <div onClick={openSignInModal}>Sign In</div>
            </div>
          )}
        </div>
      ) :  <> </>
      
      }



      <div className={styles.registerModel}>
        {showRegisterModal && <Register closeModal={closeModal} modalName="Register" />}
        {showSignInModal && <Register closeModal={closeModal} modalName="Login" />}
        {showAddStoryModal && <AddStory closeModal={closeModal} />}

      </div>
    </>
  )
}

export default Navbar