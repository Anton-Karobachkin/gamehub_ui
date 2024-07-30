import { useState, useContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { Context } from './main';
import AppRouter from './components/AppRouter';
import API from './api/API';
import './App.css'

function App() {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let response = new API().validateUser();
    response.then(res => {
      user.setIsAuth(res.statusCode === 0); // 0 - no errors
    }).finally(() => setLoading(false));
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
