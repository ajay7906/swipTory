import { useEffect, useState } from "react";
import styles from './Register.module.css'
import { loginUser, registerUser } from "../../api/auth";
import { showToast } from "../../utils/showToast";
import useAuth from '../../utils/useAuth';
function Register({ closeModal, modalName, setIsLoggedIn }) {

  const [username, setUsername] = useState('');
  const [showError, setShowError] = useState(' ')
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  console.log(username, password);

  useEffect(() => {
    // Add class to body when modal is open
    document.body.style.overflow = 'hidden';

    // Remove class from body when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
   

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let response;
    if (modalName === 'Register') {
      response = await registerUser({ username, password });
    } else {
      response = await loginUser({ username, password });
    }
   
    console.log(response);

    if (response?.success) {
     
      showToast(`${modalName} Successful`, { type: 'success' });
      closeModal();
    } else {
      setShowError(response)
    }
    // try {

    // } catch (error) {
    //   console.error('Error registering user:', error);
    //   console.log();
    //   showToast('An error occurred while registering. Please try again later.', { type: 'error' });
    // }

  };
  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <span className={styles.close} onClick={closeModal}>X</span>
        {/* <h2>{registerName} to SwipTory</h2> */}
        <h2>{modalName === 'Register' ? 'Register to SwipTory' : 'Sign In to SwipTory'}</h2>
        <form >
          <div className={styles.mobileForm}>
            <label htmlFor="">Username</label>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className={styles.mobileForm}>
            <label htmlFor="">Password</label>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className={styles.errorMessage}><p>{showError}</p></div>



          {modalName === 'Register' ?
            <>
              <button onClick={handleSubmit}>Register</button>
            </>
            :
            <>
              <button onClick={handleSubmit}>Login</button>
            </>
          }
        </form>
      </div>
    </div>
  )
}

export default Register