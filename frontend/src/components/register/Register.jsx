// import { useContext, useEffect, useState } from "react";
// import styles from './Register.module.css'
// import { loginUser, registerUser } from "../../api/auth";
// import { showToast } from "../../utils/showToast";
// import { ColorRing } from 'react-loader-spinner'
// import { AuthContext } from "../../context/authContext";
// import { ToastContainer } from 'react-toastify';
// function Register({ closeModal, modalName, setIsLoggedIn }) {

//   const [username, setUsername] = useState('');
//   const [showError, setShowError] = useState(' ')
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { isLoggedIns ,handleLogin } = useContext(AuthContext);

//   useEffect(() => {

//     window.scrollTo({ top: 0, behavior: 'instant' });
//   }, []);






//   useEffect(() => {

//     document.body.style.overflow = 'hidden';


//     return () => {
//       document.body.style.overflow = '';
//     };
//   }, []);


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     let response;
//     if (modalName === 'Register') {
//       response = await registerUser({ username, password });
//     } else {
//       response = await loginUser({ username, password });
//     }



//     if (response?.success) {
    
//       showToast(`${modalName} Successful`, { type: 'success' });
//       handleLogin()
//       closeModal();
//     } else {
//       setShowError(response)
//     }
//     setLoading(false);

//   };
//   return (
//     <div className={styles.overlay} onClick={closeModal}>
//       <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
//         <span className={styles.close} onClick={closeModal}>X</span>

//         <h2>{modalName === 'Register' ? 'Register to SwipTory' : 'Sign In to SwipTory'}</h2>
//         <form >
//           <div className={styles.mobileForm}>
//             <label htmlFor="">Username</label>
//             <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
//           </div>
//           <div className={styles.mobileForm}>
//             <label htmlFor="">Password</label>
//             <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//           </div>
//           <div className={styles.errorMessage}><p>{showError}</p></div>




//           {loading ? ( // Display loading indicator if loading is true
//             <button disabled style={{ background: '#ff7373' }}>
//               <ColorRing
//                 visible={true}
//                 height="50"
//                 width="50"
//                 ariaLabel="color-ring-loading"
//                 wrapperStyle={{}}
//                 wrapperClass="color-ring-wrapper"
//                 colors={['#e15b64', '#FFFF00', '#f8b26a', '#00FF00', '#849b87']}
//               />
//             </button>
//           ) : (
//             <button onClick={handleSubmit}>{modalName === 'Register' ? 'Register' : 'Login'}</button>
//           )}
//         </form>
//       </div>
//       <ToastContainer

//         theme='dark'
//         transition:Bounce
//         position="top-center"

//       />
//     </div>
//   )
// }

// export default Register



























































































import { useContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../../api/auth";
import { showToast } from "../../utils/showToast";
import { ColorRing } from 'react-loader-spinner';
import { AuthContext } from "../../context/authContext";
import { ToastContainer } from 'react-toastify';

function Register({ closeModal, modalName, setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState('');
  const { handleLogin } = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowError('');

    let response;
    try {
      if (modalName === 'Register') {
        // Basic validation
        if (!username || !email || !password) {
          setShowError('All fields are required');
          setLoading(false);
          return;
        }
        
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          setShowError('Please enter a valid email');
          setLoading(false);
          return;
        }
        
        response = await registerUser({ username, email, password });
        console.log('Register Response:', response);
      } else {
        if (!username || !password) {
          setShowError('Username and password are required');
          setLoading(false);
          return;
        }
        
        response = await loginUser({ username, password });
      }

      if (response?.success) {
        showToast(`${modalName} Successful`, { type: 'success' });
        handleLogin();
        closeModal();
      } else {
        setShowError(response?.message || 'An error occurred');
      }
    } catch (error) {
      setShowError('An unexpected error occurred');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-sm">
      <div 
        className="relative bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-xl overflow-hidden w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        
        {/* Close Button */}
        <button 
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="px-8 py-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {modalName === 'Register' ? 'Join SwipTory' : 'Welcome Back'}
            </h2>
            <p className="text-gray-600">
              {modalName === 'Register' 
                ? 'Create your account to start sharing stories' 
                : 'Sign in to continue your journey'}
            </p>
          </div>
          
          {/* Form */}
          <form className="space-y-5">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Email Field (only for registration) */}
            {modalName === 'Register' && (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
            
            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Error Message */}
            {showError && (
              <div className="text-red-500 text-sm bg-red-50 py-2 px-4 rounded-lg flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {showError}
              </div>
            )}
            
            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center"
            >
              {loading ? (
                <ColorRing
                  visible={true}
                  height="30"
                  width="30"
                  ariaLabel="color-ring-loading"
                  colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                />
              ) : (
                <>
                  {modalName === 'Register' ? 'Create Account' : 'Sign In'}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>
          
          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-600">
            {modalName === 'Register' ? (
              <p>
                Already have an account?{' '}
                <button 
                  type="button"
                  className="font-medium text-blue-600 hover:text-blue-500"
                  onClick={() => {
                    closeModal();
                    // You might want to open the login modal here if your context supports it
                  }}
                >
                  Sign in
                </button>
              </p>
            ) : (
              <p>
                Don't have an account?{' '}
                <button 
                  type="button"
                  className="font-medium text-blue-600 hover:text-blue-500"
                  onClick={() => {
                    closeModal();
                    // You might want to open the register modal here if your context supports it
                  }}
                >
                  Register now
                </button>
              </p>
            )}
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
    </div>
  );
}

export default Register;