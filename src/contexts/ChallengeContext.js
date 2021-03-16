import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../util/challenge';

import axios from 'axios';
import { LevelUpModal } from '../components/LevelUpModal';

export const ChallengesContext = createContext({});

export function ChallengesProvider({ 
  children,
  ...rest 
}) {
  const id = Cookies.get('id');
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState( rest.challengesCompleted ?? 0);

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
  

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  },[]);

  useEffect(() => {
    
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
    Cookies.set('experienceToNextLevel', String(experienceToNextLevel));
  
    updateData();
  },[level, currentExperience, challengesCompleted]);

  
  async function updateData() {
  
    await axios.put('api/user/updateUser', {
      id,
      level,
      currentExperience,
      challengesCompleted,
      experienceToNextLevel
    })    
  }

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallendIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallendIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play;

    if(Notification.permission === 'granted') {
      new Notification('Novo desafio ', {
        body: `Valendo ${challenge.amount}xp!`
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if(!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if(finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted( challengesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider
    value={{      
      level,
      currentExperience,
      challengesCompleted,
      experienceToNextLevel,
      levelUp,
      startNewChallenge,
      activeChallenge,
      resetChallenge,
      completeChallenge,
      closeLevelUpModal,
    }}
    >
      {children}

      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}