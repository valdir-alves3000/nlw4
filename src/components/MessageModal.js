import { useContext } from 'react';
import { SignInUpContext } from '../contexts/SignInUpContext';

import styles from '../styles/components/MessageModal.module.css';
import { FiCheckCircle, FiInfo } from 'react-icons/fi';

export function MessageModal() {
  const { message, closeMessageModal, iconSuccess } = useContext(SignInUpContext);

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>

        {
          iconSuccess ? (
            <FiCheckCircle size={80} color="#a5dc86" />
          ) : (
            <FiInfo size={80} color="#eb8811cc" />

          )
        }
        <h1>{message}</h1>

        <button
          type='button'
          onClick={closeMessageModal}
        >
          OK
         </button>
      </div>
    </div>
  );
}