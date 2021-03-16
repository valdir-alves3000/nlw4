import { SignInUpProvider } from '../contexts/SignInUpContext';

import { SignIn } from '../components/SignIn';

export default function Index() {
  return (
    <SignInUpProvider>      
      <SignIn />
    </SignInUpProvider>
   
  );  
}