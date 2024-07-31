import React, { useSyncExternalStore, createContext } from 'react'
import ReactDOM from 'react-dom/client'
import UserStore from './store/UserStore';
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

export const Context = createContext(null);
ReactDOM.createRoot(document.getElementById('root')).render(
  <Context.Provider value={{ user: new UserStore() }}>
    <App />
  </Context.Provider>
)

setTimeout(() => {
  const html = document.getElementsByTagName('html');
  html[0].setAttribute('data-bs-theme', 'dark');
}, 100)