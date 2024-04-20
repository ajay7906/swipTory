import { useState } from "react";
import styles from './Register.module.css'
import { loginUser, registerUser } from "../../api/auth";
import { showToast } from "../../utils/showToast";

function Register({ closeModal, modalName }) {

  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (modalName === 'Register') {
        response = await registerUser({ username, password });
      } else {
        response = await loginUser({ username, password });
      }

      console.log(response);

      if (response.success) {
        showToast(`${modalName} successful`, { type: 'success' });
        closeModal();
      } else {
        showToast(response.errorMessage, { type: 'error' });
      }
    } catch (error) {
      console.error('Error registering user:', error);
      showToast('An error occurred while registering. Please try again later.', { type: 'error' });
    }

  };
  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <span className={styles.close} onClick={closeModal}>X</span>
        {/* <h2>{registerName} to SwipTory</h2> */}
        <h2>{modalName === 'Register' ? 'Register to SwipTory' : 'Sign In to SwipTory'}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Username</label>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="">Password</label>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

         

          <button type="submit">{modalName === 'Register' ? 'Register' : 'Login'}</button>
        </form>
      </div>
    </div>
  )
}

export default Register