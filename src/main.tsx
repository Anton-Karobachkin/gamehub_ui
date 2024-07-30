import React, { useSyncExternalStore, createContext } from 'react'
import ReactDOM from 'react-dom/client'
import UserStore from './store/UserStore';
import App from './App.tsx'
import './index.css'

export const Context = createContext(null);
ReactDOM.createRoot(document.getElementById('root')).render(
  <Context.Provider value={{ user: new UserStore() }}>
    <App />
  </Context.Provider>

)
