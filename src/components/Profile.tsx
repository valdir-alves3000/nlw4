import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengeContext';

import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { level, name, } = useContext(ChallengesContext);
  
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/valdir-alves3000.png" alt="Valdir Alves" />
      <div>

        <strong>{name}</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level {level}
          </p>
      </div>
    </div>
  );
}