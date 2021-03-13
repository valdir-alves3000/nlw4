import Head from 'next/head';

import { GetServerSideProps } from 'next';

import { Countdown } from '../components/Countdown';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { ChallengeBox } from '../components/ChallengeBox';

import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider} from '../contexts/ChallengeContext';

import styles from '../styles/pages/Home.module.css';

interface HomeProps {
  name: string;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {

  return (
    <ChallengesProvider
      level={props.level}
      name={props.name}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
        <link rel="shortcut icon" href="/favicon.png" type="image/png"/>

          <title>Início | move.it</title>
        </Head>

          <ExperienceBar />

          <CountdownProvider>
            <section>
              <div>
                <Profile />
                <CompletedChallenges />
                <Countdown />
              </div>
              <div>
                <ChallengeBox />
              </div>
            </section>
          </CountdownProvider>
        
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { name, level, currentExperience, challengesCompleted, experienceToNextLevel } = ctx.req.cookies;

  return {
    props: {
      name: name,
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
      experienceToNextLevel: Number(experienceToNextLevel),
    }
  }
}