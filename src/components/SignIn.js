import { useContext } from 'react';
import { SignInUpContext } from '../contexts/SignInUpContext';

import { SignUp } from './SignUp';
import styles from '../styles/components/SignIn.module.css';

export function SignIn() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    signUp,
    handleSignIn,
    handleTileSignUp
  } = useContext(SignInUpContext);

  return (

    <div className={styles.container}>
      {
        signUp ? (
          <SignUp />
        ) : (

          <div className={styles.user} >
            <form action=""
              className={styles.form}
            >
              <h2>Sign In</h2>

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={text => setEmail(text.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={text => setPassword(text.target.value)}
              />

              <button type="submit"
                onClick={handleSignIn}
              >Sign In</button>

              <p>
                dont't have an account?
          <span
                  onClick={handleTileSignUp}
                >
                  Sign Up
            </span>
              </p>

            </form>
          </div>

        )
      }
    </div >

  );
}