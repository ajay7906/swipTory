
// import { useContext, useEffect, useState } from 'react';
// import styles from './Navbar.module.css'
// import Register from '../register/Register';
// import AddStory from '../addStory/AddStory';
// import BarImg from '../../assets/bar.png'
// import { Link } from 'react-router-dom';
// import CrossBtn from '../../assets/cross.png'
// import useMediaQuery from '../../utils/screenSize';
// import Save from '../../assets/save.png'

// import { AuthContext } from '../../context/authContext';

// function Navbar() {
//   // State variables
//   const [showRegisterModal, setShowRegisterModal] = useState(false);
//   const [showSignInModal, setShowSignInModal] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [showAddStoryModal, setShowAddStoryModal] = useState(false);
//   const [showResponsiveModal, setShowResponsiveModal] = useState(false);
 
//   const isMobile = useMediaQuery('(max-width: 780px)');
  
//   const {isLoggedIns, showLoginModal, closeLoginModal , username ,  logout } = useContext(AuthContext);
 
  
//   const openshowAddStoryModalModal = () => {
//     setShowAddStoryModal(true);

//   };
//   const openRegisterModal = () => {
//     setShowRegisterModal(true);

//   };
  
//   const handleLogout = () => {
   
//   //  localStorage.removeItem('token');
//     setShowProfileModal(false);
//     setShowResponsiveModal(!showResponsiveModal);
//     logout()
   
// //setIsLoggedIn(false);
   

//   };

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
//     closeLoginModal()
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
//             <h2 className='underline underline-offset-8'>SwipTory</h2>
//           </div>
//           {/* desktop  navigation bar */}
//           {
//             !isMobile ? (
//               <div className={styles.register}>
//                 {showProfileModal && (
//                   <div className={styles.profileModal}>
//                     <div className={styles.profileContent}>
//                       <h3>{username?.username}</h3>
//                       <button onClick={() => {
//                         closeProfileModal()
//                         handleLogout()
//                       }}>Logout</button>
//                     </div>
//                   </div>
//                 )}
//                 {isLoggedIns ? (
//                   <>
//                     <div className={styles.bookmarksLink}>
//                       <img src={Save} alt="" />
//                       <Link to='/bookmarks' className={styles.bookMarkLink}>Bookmarks</Link>
//                     </div>
//                     <button> <Link to='/addstory'>Add Story</Link> </button>
//                     <div className={styles.profileImg}>
                      
//                       <Link to='/profile'>
//                       <img src="https://swiptory001.netlify.app/static/media/user.5eb483b86d841223e1b4.png" alt="" />
                       
//                       </Link>

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
      

//       </div>
    
//       {

//         showResponsiveModal && isMobile ? (
//           <div className={styles.mobileResponsiveContainer}>
//             {isLoggedIns ? (
//               <div className={styles.mobileResponsive}>
//                 <img className={styles.mobileResponsiveCrossBtn} src={CrossBtn} alt="cross" onClick={toggleResponsiveModal} />
//                 <div className={styles.profileImg}>
//                   <img src="https://swiptory001.netlify.app/static/media/user.5eb483b86d841223e1b4.png" alt="" />

//                 </div>
//                 <div className={styles.responsiveNavLink}>
//                   <div className={styles.profileContent}>
//                     <h1>{username?.username}</h1>
//                   </div>
//                   <div className={styles.profileContent}>
//                     <Link to='/your_story' onClick={toggleResponsiveModal} className={styles.bookmarksLink}>
//                       Your Story
//                     </Link>
//                   </div>

//                   <div className={styles.profileContent}>
//                     <button onClick={openshowAddStoryModalModal}>Add Story</button>
//                   </div>
//                   <div className={styles.profileContent}>
//                     <div className={styles.bookmarksLink}>
//                       <img src={Save} alt="Save Icon" />
//                       <Link to='/bookmarks' onClick={toggleResponsiveModal} className={styles.bookMarkLink}> Bookmarks</Link>
//                     </div>

//                   </div>
//                   <div className={styles.profileContent} onClick={() => {
//                     handleLogout()
//                     closeProfileModal()
//                   }}><button className='text-3xl font-bold underline'>Logout</button></div>
//                 </div>
//               </div>
//             ) : (
//               <div className={styles.mobileResponsive}>
//                 <div className={styles.crossResponsive}><img  src={CrossBtn} alt="cross" onClick={toggleResponsiveModal} /></div>
//                 <div className={styles.withOutLoginBtn}>
//                   <button onClick={openRegisterModal}>Register Now</button>
//                   <button onClick={openSignInModal}>Sign In</button>
//                 </div>
//               </div>
//             )}
//           </div>
//         ) : <> </>

//       }



//       <div className={styles.registerModel}>
//         {showRegisterModal && <Register closeModal={closeModal} modalName="Register" />}
//         {showSignInModal  && <Register closeModal={closeModal} modalName="Login" />}
//         {showLoginModal  && <Register closeModal={closeModal} modalName="Login" />}
//         {/* {showAddStoryModal && <AddStory closeModal={closeModal} />} */}

//       </div>
//     </>
//   )
// }

// export default Navbar 









import { useContext, useEffect, useState } from 'react';
import Register from '../register/Register';
import AddStory from '../addStory/AddStory';
import BarImg from '../../assets/bar.png';
import { Link, useNavigate } from 'react-router-dom';
import CrossBtn from '../../assets/cross.png';
import useMediaQuery from '../../utils/screenSize';
import Save from '../../assets/save.png';
import { AuthContext } from '../../context/authContext';
import { useNotifications } from '../../context/notificationContext';

function Navbar() {
  // State variables
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showAddStoryModal, setShowAddStoryModal] = useState(false);
  const [showResponsiveModal, setShowResponsiveModal] = useState(false);
  const navigate = useNavigate();
  
  const isMobile = useMediaQuery('(max-width: 780px)');
  const { isLoggedIns, showLoginModal, closeLoginModal, username, logout } = useContext(AuthContext);
  const { unreadCount } = useNotifications();

  const openRegisterModal = () => setShowRegisterModal(true);
  const openSignInModal = () => setShowSignInModal(true);
  const openshowAddStoryModalModal = () => setShowAddStoryModal(true);
  
  const handleLogout = () => {
    logout();
    setShowResponsiveModal(false);
    navigate('/');
  };

  useEffect(() => {
    if (showSignInModal || showResponsiveModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showSignInModal, showResponsiveModal]);

  const closeModal = () => {
    setShowRegisterModal(false);
    setShowSignInModal(false);
    setShowAddStoryModal(false);
    closeLoginModal();
  };

  const toggleResponsiveModal = () => setShowResponsiveModal(!showResponsiveModal);

  return (
    <>
      <div className="h-20 shadow-md flex items-center bg-white">
        <nav className="flex justify-between items-center w-full px-4 py-3 sm:px-8" style={{padding:'10px'}}>
          <div className="text-3xl font-bold underline underline-offset-8">
            <Link to="/">SwipTory</Link>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="flex items-center gap-4">
              {isLoggedIns ? (
                <>
                  <Link 
                    to="/bookmarks" 
                    className="flex items-center gap-1 bg-[#ff7373] text-white font-bold px-4 py-2 rounded-full" 
                   
                  >
                    <img src={Save} alt="Bookmark" className="w-5 h-5" />
                    Bookmarks
                  </Link>
                  <Link to="/following" className="rounded-full px-3 py-2 font-semibold text-gray-700 hover:bg-violet-50 hover:text-violet-700">Following</Link>
                  <Link to="/notifications" className="relative rounded-full px-3 py-2 font-semibold text-gray-700 hover:bg-violet-50 hover:text-violet-700">Notifications{unreadCount > 0 && <span className="ml-2 inline-flex min-w-5 items-center justify-center rounded-full bg-rose-500 px-1.5 py-0.5 text-[11px] font-black text-white">{unreadCount > 99 ? '99+' : unreadCount}</span>}</Link>
                  
                  <Link 
                    to="/addstory" 
                    className="bg-[#ff7373] text-white font-bold px-4 py-2 rounded-full"
                   
                  >
                    Add Story
                  </Link>
                  
                  <Link to="/profile" className="group flex items-center gap-2 rounded-full px-2 py-1 hover:bg-violet-50">
                    <img src={username?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(username?.username || 'Creator')}&background=6d28d9&color=fff`} alt="Profile" className="h-10 w-10 rounded-full object-cover" />
                    <span className="font-semibold text-gray-700 group-hover:text-violet-700">Profile</span>
                  </Link>
                  
                  <button 
                    onClick={handleLogout}
                    className="bg-red-500 text-white font-bold px-4 py-2 rounded-full hover:bg-red-600 transition"
                  
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={openRegisterModal}
                    className="bg-[#ff7373] text-white font-bold px-4 py-2 rounded-full"
                  >
                    Register Now
                  </button>
                  <button 
                    onClick={openSignInModal}
                    className="bg-[#73ABFF] text-white font-bold px-4 py-2 rounded-full"
                  >
                    Sign In
                  </button>
                </>
              )}
            </div>
          )}

          {/* Mobile Toggle Button */}
          {isMobile && (
            <button onClick={toggleResponsiveModal}>
              <img src={BarImg} alt="Menu" className="w-8" />
            </button>
          )}
        </nav>
      </div>

      {/* Mobile Menu Modal */}
      {showResponsiveModal && isMobile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="h-dvh w-full overflow-y-auto bg-white p-5 sm:p-6">
            <div className="flex justify-end">
              <button onClick={toggleResponsiveModal}>
                <img src={CrossBtn} alt="Close" className="w-6 h-6" />
              </button>
            </div>
            
            {isLoggedIns ? (
              <div className="flex flex-col items-center gap-4 pb-8 pt-5 sm:mt-5 sm:gap-6">
                <Link to="/profile" onClick={toggleResponsiveModal} className="flex flex-col items-center gap-2">
                  <img src={username?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(username?.username || 'Creator')}&background=6d28d9&color=fff`} alt="Profile" className="w-20 h-20 rounded-full object-cover shadow-md" />
                  <span className="text-lg font-bold">View your profile</span>
                </Link>
                
                <h1 className="text-xl font-bold">{username?.username}</h1>
                
                <Link 
                  to="/your_story" 
                  onClick={toggleResponsiveModal}
                  className="text-lg font-medium hover:text-blue-600"
                >
                  Your Story
                </Link>
                
                <button 
                  onClick={() => {
                    openshowAddStoryModalModal();
                    toggleResponsiveModal();
                  }}
                  className="bg-[#ff7373] text-white font-bold px-4 py-2 rounded-full w-full"
                >
                  Add Story
                </button>
                
                <Link 
                  to="/bookmarks" 
                  onClick={toggleResponsiveModal}
                  className="flex items-center gap-2 text-lg font-medium hover:text-blue-600"
                >
                  <img src={Save} alt="Bookmark" className="w-5 h-5" />
                  Bookmarks
                </Link>
                <Link to="/following" onClick={toggleResponsiveModal} className="text-lg font-medium hover:text-violet-700">Following</Link>
                <Link to="/notifications" onClick={toggleResponsiveModal} className="flex items-center justify-between text-lg font-medium hover:text-violet-700">Notifications{unreadCount > 0 && <span className="rounded-full bg-rose-500 px-2 py-0.5 text-xs font-bold text-white">{unreadCount > 99 ? '99+' : unreadCount}</span>}</Link>
                
                <button 
                  onClick={handleLogout}
                  className="bg-red-500 text-white font-bold px-4 py-2 rounded-full w-full mt-4 hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-6 mt-20">
                <button 
                  onClick={() => {
                    openRegisterModal();
                    toggleResponsiveModal();
                  }}
                  className="bg-[#ff7373] text-white font-bold px-4 py-2 rounded-full"
                >
                  Register Now
                </button>
                <button 
                  onClick={() => {
                    openSignInModal();
                    toggleResponsiveModal();
                  }}
                  className="bg-[#73ABFF] text-white font-bold px-4 py-2 rounded-full"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modals */}
      <div>
        {showRegisterModal && <Register closeModal={closeModal} modalName="Register" />}
        {showSignInModal && <Register closeModal={closeModal} modalName="Login" />}
        {showLoginModal && <Register closeModal={closeModal} modalName="Login" />}
        {showAddStoryModal && <AddStory closeModal={closeModal} />}
      </div>
    </>
  )
}

export default Navbar;

