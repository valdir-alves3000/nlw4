import { useContext } from 'react';
import { SignInUpContext } from '../contexts/SignInUpContext';

import styles from '../styles/components/SignIn.module.css';

export function SignUp() {
  const { 
    email, 
    setEmail,  
    password,
    confirmPassword,
    setPassword,
    setConfirmPassword,
    name,
    setName,
    handleTileSignUp,
    handleSignUp,
  } = useContext(SignInUpContext);  

  return (
    
<div className={styles.user} >
  <form action=""
    className={styles.form}
  >
    <h2>Create an account</h2>

    <input
      type="text"
      placeholder="UserName"
      value={name}
      onChange={text => setName(text.target.value)}
    />

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

    <input
      type="password"
      placeholder="Confirm Password"
      value={confirmPassword}
      onChange={text => setConfirmPassword(text.target.value)}
    />

    <button     
      type="submit"
      onClick={handleSignUp}
    >
      Sign Up</button>

    <p>
      Already have an account?
          <span
        onClick={handleTileSignUp}
      >
        Sign In
            </span>
    </p>

  </form>
</div>

);
}