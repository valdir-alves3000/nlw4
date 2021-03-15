import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { useRouter } from 'next/router';
import { MessageModal } from '../components/MessageModal';

export const SignInUpContext = createContext({});

export function SignInUpProvider({
  children,
  ...rest
}) {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [signUp, setSignUp] = useState(false);
  const [message, setMessage] = useState('');
  const [iconSuccess, setIconSuccess] = useState(false);
  const [messageOpenModal, setMessageOpenModal] = useState(false);

  const router = useRouter();

  async function handleSignUp(event) {
    event.preventDefault();

    if (!password || !email || !name || !confirmPassword) {
      setIconSuccess(false);
      setMessage('Preencha todos os campos para continuar!');
      setMessageOpenModal(true);
      return;
    }

    if (password !== confirmPassword) {
      setIconSuccess(false);
      setMessage('Senha não confirmada!');
      setMessageOpenModal(true);
      return
    }

    const response = await axios.post('api/user/createUser', {
      name,
      password,
      email
    });

    if (response.data.message === true) {
      setIconSuccess(false);
      setMessage('E-mail já registrado! Tente com outro email');
      setMessageOpenModal(true);
      return;
    } else {
      setIconSuccess(true);
      setMessage(JSON.stringify(response.data.message));
      setMessageOpenModal(true);
      setSignUp(false);
    }
  }

  async function handleSignIn(event) {
    event.preventDefault();

    if (!password || !email) {
      setIconSuccess(false);
      setMessage('Preencha os campos, email e senha para continuar!');
      setMessageOpenModal(true);
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
      setIconSuccess(false);
      setMessage(JSON.stringify(response.data.message));
      setMessageOpenModal(true);
    }

  }

  function handleTileSignUp() {
    setSignUp(!signUp);
  }

  function closeMessageModal() {
    setMessageOpenModal(false);
  }

  return (
    <SignInUpContext.Provider
      value={{
        name,
        setName,
        email,
        setEmail,
        password,
        confirmPassword,
        signUp,
        message,
        iconSuccess,
        setPassword,
        setConfirmPassword,
        handleSignIn,
        handleSignUp,

        handleTileSignUp,
        closeMessageModal

      }}
    >
      {children}

      {messageOpenModal && <MessageModal />}
    </SignInUpContext.Provider>
  );
}
