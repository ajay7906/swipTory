import { useContext, useEffect, useState } from "react";
import styles from './Register.module.css'
import { loginUser, registerUser } from "../../api/auth";
import { showToast } from "../../utils/showToast";
import { ColorRing } from 'react-loader-spinner'
import { AuthContext } from "../../context/authContext";
function Register({ closeModal, modalName, setIsLoggedIn }) {

  const [username, setUsername] = useState('');
  const [showError, setShowError] = useState(' ')
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { isLoggedIns, setUser } = useContext(AuthContext);

  useEffect(() => {

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);






  useEffect(() => {

    document.body.style.overflow = 'hidden';


    return () => {
      document.body.style.overflow = '';
    };
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let response;
    if (modalName === 'Register') {
      response = await registerUser({ username, password });
    } else {
      response = await loginUser({ username, password });
    }



    if (response?.success) {
      setUser(response?.username)
      showToast(`${modalName} Successful`, { type: 'success' });
      closeModal();
    } else {
      setShowError(response)
    }
    setLoading(false);

  };
  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <span className={styles.close} onClick={closeModal}>X</span>

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



          {/* {modalName === 'Register' ?
            <>
              <button onClick={handleSubmit}>Register</button>
            </>
            :
            <>
              <button onClick={handleSubmit}>Login</button>
            </>
          } */}
          {loading ? ( // Display loading indicator if loading is true
            <button disabled style={{ background: '#ff7373' }}>
              <ColorRing
                visible={true}
                height="50"
                width="50"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#e15b64', '#FFFF00', '#f8b26a', '#00FF00', '#849b87']}
              />
            </button>
          ) : (
            <button onClick={handleSubmit}>{modalName === 'Register' ? 'Register' : 'Login'}</button>
          )}
        </form>
      </div>
    </div>
  )
}

export default Register