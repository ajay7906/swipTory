// import { useEffect, useState } from 'react';
// import styles from './Navbar.module.css'
// import Register from '../register/Register';
// import AddStory from '../addStory/AddStory';
// import BarImg from '../../assets/bar.png'
// import { Link } from 'react-router-dom';
// import CrossBtn from '../../assets/cross.png'
// import useMediaQuery from '../../utils/screenSize';
// import useLocalStorage from '../../utils/useAuth';
// import useAuth from '../../utils/useAuth';

// function Navbar() {
//   // State variables
//   const [showRegisterModal, setShowRegisterModal] = useState(false);
//   const [showSignInModal, setShowSignInModal] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [showAddStoryModal, setShowAddStoryModal] = useState(false);
//   const [showResponsiveModal, setShowResponsiveModal] = useState(false);

//   const isMobile = useMediaQuery('(max-width: 780px)');
//   // const [isLoggedIn, setIsLoggedIn] = useLocalStorage('token', false);
//   // const { isLoggedIn, login, logout } = useAuth();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       setIsLoggedIn(true);
//     }
//      // Update isLoggedIn based on whether token exists
//   }, []);

//   // Function to handle opening the register modal
//   const openshowAddStoryModalModal = () => {
//     setShowAddStoryModal(true);

//   };
//   const openRegisterModal = () => {
//     setShowRegisterModal(true);

//   };
//   const handleLogout = () => {
//     // Remove token from local storage
//     localStorage.removeItem('token');
//     setIsLoggedIn(false)
//     setShowProfileModal(false);
//     setShowResponsiveModal(!showResponsiveModal);

//   };

//   const isLogginFunction = ()=>{

//   }

//   // Function to handle opening the sign-in modal
//   const openSignInModal = () => {
//     setShowSignInModal(true);
//   };
//   useEffect(() => {
//     if (showSignInModal) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'auto';
//     }
//   }, [showSignInModal]);

//   // Function to handle closing the modals
//   const closeModal = () => {
//     setShowRegisterModal(false);
//     setShowSignInModal(false);
//     setShowAddStoryModal(false)
//   };
//   // Function to handle opening the profile modal
//   const openProfileModal = () => {
//     setShowProfileModal(true);
//   };

//   // Function to handle closing the profile modal
//   const closeProfileModal = () => {
//     setShowProfileModal(false);
//   };
//   const toggleProfileModal = () => {
//     setShowProfileModal(prevState => !prevState);
//   };

//   const toggleResponsiveModal = () => {
//     setShowResponsiveModal(!showResponsiveModal);
//   };
//   return (
//     <>
//       <div className={styles.main}>
//         <nav className={styles.nav}>
//           <div className={styles.swiptory}>
//             <h2>SwipTory</h2>
//           </div>
//           {/* desktop  navigation bar */}
//           {
//             !isMobile ? (
//               <div className={styles.register}>
//                 {showProfileModal && (
//                   <div className={styles.profileModal}>
//                     <div className={styles.profileContent}>
//                       <h3>User Name</h3>
//                       <button onClick={()=>{
//                         closeProfileModal()
//                         handleLogout()
//                       }}>Logout</button>
//                     </div>
//                   </div>
//                 )}
//                 {isLoggedIn ? (
//                   <>
//                     <Link to='/bookmarks' className={styles.bookmarksLink}>Bookmarks</Link>
//                     <button onClick={openshowAddStoryModalModal}>Add Story</button>
//                     <div className={styles.profileImg}>
//                       <img src="https://swiptory001.netlify.app/static/media/user.5eb483b86d841223e1b4.png" alt="" />

//                     </div>
//                     <div className={styles.barImgs}>
//                       <img src={BarImg} alt="bar" onClick={toggleProfileModal} />

//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <button className={styles.registerBtn} onClick={openRegisterModal}>Register Now</button>
//                     <button className={styles.signin} onClick={openSignInModal}>Sign In</button>
//                   </>
//                 )}
//               </div>

//             )


//               : (
//                 <div className={styles.barImgs} onClick={toggleResponsiveModal}>
//                   <img src={BarImg} alt="" />
//                 </div>
//               )
//           }
//           {/* <div className={styles.barImgs} onClick={toggleResponsiveModal}>
//             <img src={BarImg} alt="" />
//           </div> */}
//         </nav>
//         {/* Register Modal */}

//       </div>
//       {/* Mobile responsive modal */}
//       {

//       showResponsiveModal && isMobile ? (
//         <div className={styles.mobileResponsiveContainer}>
//           {isLoggedIn ? (
//             <div className={styles.mobileResponsive}>
//               <img src={CrossBtn} alt="cross" onClick={toggleResponsiveModal} />
//               <div className={styles.profileImg}>
//                 <img src="https://swiptory001.netlify.app/static/media/user.5eb483b86d841223e1b4.png" alt="" />

//               </div>
//               <div className={styles.responsiveNavLink}>
//                 <div className={styles.profileContent}>
//                   <h1>User</h1>
//                 </div>
//                 <div className={styles.profileContent}>
//                   <button>
//                     Your Profile
//                   </button>
//                 </div>

//                 <div className={styles.profileContent}>
//                   <button>User</button>
//                 </div>
//                 <div className={styles.profileContent}>
//                   <button>User</button>
//                 </div>
//                 <div className={styles.profileContent} onClick={()=>{
//                   handleLogout()
//                   closeProfileModal()
//                 }}><button>Logout</button></div>
//               </div>
//             </div>
//           ) : (
//             <div className={styles.mobileResponsive}>
//               <button onClick={openRegisterModal}>Register Now</button>
//               <button onClick={openSignInModal}>Sign In</button>
//             </div>
//           )}
//         </div>
//       ) :  <> </>

//       }



//       <div className={styles.registerModel}>
//         {showRegisterModal && <Register closeModal={closeModal} setIsLoggedIn={setIsLoggedIn} modalName="Register" />}
//         {showSignInModal && <Register closeModal={closeModal} setIsLoggedIn={setIsLoggedIn} modalName="Login" />}
//         {showAddStoryModal && <AddStory closeModal={closeModal} />}

//       </div>
//     </>
//   )
// }


// export default Navbar






import { useEffect, useState } from 'react';
import styles from './Navbar.module.css'
import Register from '../register/Register';
import AddStory from '../addStory/AddStory';
import BarImg from '../../assets/bar.png'
import { Link } from 'react-router-dom';
import CrossBtn from '../../assets/cross.png'
import useMediaQuery from '../../utils/screenSize';
import Save from '../../assets/save.png'
import useUserAuth from '../../utils/useUserAuth';

function Navbar() {
  // State variables
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAddStoryModal, setShowAddStoryModal] = useState(false);
  const [showResponsiveModal, setShowResponsiveModal] = useState(false);
  const isMobile = useMediaQuery('(max-width: 780px)');
  const { isLoggedIns, user, login, logout } = useUserAuth();

  const loggedInUser = localStorage.getItem('token');

  useEffect(() => {
   
    console.log(loggedInUser);
    if (loggedInUser) {
      setIsLoggedIn(true);
    }
    else{
      setIsLoggedIn(false)
    }
     // Update isLoggedIn based on whether token exists
  }, [isLoggedIn,  loggedInUser]);

  // Function to handle opening the register modal
  console.log(isLoggedIn);
  const openshowAddStoryModalModal = () => {
    setShowAddStoryModal(true);

  };
  const openRegisterModal = () => {
    setShowRegisterModal(true);

  };
  // useEffect(()=>{
   
  // })
  const handleLogout = () => {
    // Remove token from local storage
    // localStorage.removeItem('token');
    logout();
    // Remove user data from localStorage
    localStorage.removeItem('token');
    setShowProfileModal(false);
    setShowResponsiveModal(!showResponsiveModal);

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
                      <button onClick={() => {
                        closeProfileModal()
                        handleLogout()
                      }}>Logout</button>
                    </div>
                  </div>
                )}
                {isLoggedIn ? (
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
        {/* Register Modal */}

      </div>
      {/* Mobile responsive modal */}
      {

        showResponsiveModal && isMobile ? (
          <div className={styles.mobileResponsiveContainer}>
            {isLoggedIn ? (
              <div className={styles.mobileResponsive}>
                <img className={styles.mobileResponsiveCrossBtn} src={CrossBtn} alt="cross" onClick={toggleResponsiveModal} />
                <div className={styles.profileImg}>
                  <img src="https://swiptory001.netlify.app/static/media/user.5eb483b86d841223e1b4.png" alt="" />

                </div>
                <div className={styles.responsiveNavLink}>
                  <div className={styles.profileContent}>
                    <h1>User</h1>
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
        {showSignInModal && <Register closeModal={closeModal} modalName="Login" />}
        {showAddStoryModal && <AddStory closeModal={closeModal} />}

      </div>
    </>
  )
}

export default Navbar 
