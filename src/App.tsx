import * as React from 'react';
import { ProvideAppState } from './hooks/useAppState'
import Router from './router'

export default function App() {
  console.log("TEST");
  return (
    <div>
      <ProvideAppState>
        <Router />
      </ProvideAppState>
    </div>
  )
}