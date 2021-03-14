import { useState} from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import axios from 'axios';

import styles from '../styles/components/Login.module.css';

export function Login() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [register, setRegister] = useState(false);
  const router = useRouter();

  async function handleRegister(event) {
    event.preventDefault();

    if (!password || !email || !name || !confirmPassword) {
      alert('Preencha todos os campos!');
      return;
    }

    if (password !== confirmPassword) {
      alert('Password does not match');
      return
    }

    const response = await axios.post('api/user/createUser', {
      name,
      password,
      email
    });

      alert(JSON.stringify(response.data.message));

      setRegister(false);
    
  }

  async function handleLogin(event) {
    event.preventDefault();

    if (!password || !email) {
      alert('Preencha os campos, email e senha para continuar!');
      return;
    }

    const response = await axios.post
      ('api/user/profile', {
        password,
        email
      }
      )

    if (response.data._id) {
      Cookies.set('id', String(response.data._id));
      Cookies.set('name', String(response.data.name));
      Cookies.set('level', String(response.data.level));
      Cookies.set('currentExperience', String(response.data.currentExperience));
      Cookies.set('challengesCompleted', String(response.data.challengesCompleted));
      Cookies.set('experienceToNextLevel', String(response.data.experienceToNextLevel));

      router.push('/Home');
    } else {
      alert(JSON.stringify(response.data.message));
    }

  }

  return (
    <div className={styles.container}>
      {
        !register ? (
          <>
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
                  onClick={handleLogin}
                >Sign In</button>

                <p>
                  dont't have an account?
            <span
                    onClick={() => setRegister(true)}
                  >
                    Sign Up
              </span>
                </p>

              </form>
            </div>
          </>
        ) : (
          <>
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
                  onClick={handleRegister}
                  type="submit"
                >
                  Sign Up</button>

                <p>
                  Already have an account?
            <span
                    onClick={() => setRegister(false)}
                  >
                    Sign In
              </span>
                </p>

              </form>
            </div>
          </>
        )
      }
    </div>
  );
}