import { useState } from "react";
import styles from './Register.module.css'

function Register({ closeModal }) {
  // State variables
  //const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        <h2>Register to SwipTory</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Username</label>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="">Password</label>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          {/* <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /> */}

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  )
}

export default Register