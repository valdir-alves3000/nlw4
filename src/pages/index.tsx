import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';

import axios from 'axios';

import styles from '../styles/components/Login.module.css';
import { Login } from '../components/Login';

export default function Index() {
return (
  <div>
    <Login />
  </div>
);
}