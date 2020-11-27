import * as React from 'react';
import { useAppState } from '../hooks/useAppState'

const Home = () => {
  const appState = useAppState();

  return (
    <div>
      <h1>A Collection of random projects</h1>
    </div>
  )
};

export default Home;