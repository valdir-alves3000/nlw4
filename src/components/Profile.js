import { useContext, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengeContext';

import styles from '../styles/components/Profile.module.css';

import { signIn, signOut, useSession } from 'next-auth/client';

export function Profile() {
  const { level } = useContext(ChallengesContext);
  const [session] = useSession();
  
  return (
    <div className={styles.profileContainer}>
      {session ? (
        <img style={{ cursor: 'pointer' }}
          onClick={() => signOut()}
          src={session?.user?.image} alt={session?.user?.name} />
      ) : (
        <img src="icons/user.svg" alt="User" />
      )}
      <div>
        {session ? (
          <strong>{session?.user?.name}</strong>
        ) : (
          <button onClick={() => signIn('google')}>SignIn</button>
        )}
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  );
}