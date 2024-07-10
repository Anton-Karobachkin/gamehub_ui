import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem("gamehubtoken"))

  const _onEmailChange = (evt) => {
    let email = evt.target.value;
    setEmail(email);
  }

  const _onPasswordChange = (evt) => {
    let password = evt.target.value;
    setPassword(password);
  }

  const _submitForm = (evt) => {
    console.log('SubmitForm', evt);
    console.log(email, password)

    let loginRequest = fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    loginRequest.then((resp) => {
      return resp.json()
    }).then((data) => {
      console.log(data.token)
      localStorage.setItem("gamehubtoken", data.token);
      setToken(data.token);
    });
  }

  const _submitRequest = (evt) => {
    let testRequest = fetch('http://localhost:3000/test', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      }
    });
    testRequest.then((resp) => {
      return resp.json()
    }).then((data) => {
      console.log(data)
    });
  }

  return (
    <>
      {!token &&
        <Form className='form'>
          <label htmlFor="uname"><b>Email</b></label>
          <input type="email" placeholder="Enter Email" value={email} onChange={_onEmailChange} required />

          <label htmlFor="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" value={password} onChange={_onPasswordChange} required />

          <button type="button" onClick={_submitForm}>Login</button>
        </Form>
      }
      {token &&
        <button type="button" onClick={_submitRequest}>Test</button>
      }
    </>
  )
}

export default App
