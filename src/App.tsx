import { useState, useContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { Context } from './main';
import AppRouter from './components/AppRouter';
import './App.css'

function App() {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (window.navigator.onLine) {
      try {
        fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("gamehubtoken")
          }
        }).then((response) => {
          return response.json();
        }).then((userData) => {
          console.log(userData);
          user.setUser(userData);
          user.setIsAuth(!!Object.keys(userData).length);
        }).finally(() => {
          setLoading(false);
        })
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  if (loading) {
    return <Spinner animation={'grow'} />
  }
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
