import { useState, useContext, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { HOME_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { Context } from '../main';
import { observer } from 'mobx-react-lite';

let Auth = observer(() => {

    const location = useLocation();
    const navigate = useNavigate();

    const { user } = useContext(Context);

    // if (user.isAuth) navigate(HOME_ROUTE);

    const isLogin = location.pathname === LOGIN_ROUTE;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const _onEmailChange = (evt) => {
        let email = evt.target.value;
        setEmail(email);
    }

    const _onPasswordChange = (evt) => {
        let password = evt.target.value;
        setPassword(password);
    }

    const _onLogin = async (evt) => {
        try {
            let response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });
            let userData = await response.json();
            console.log(userData);
            if (Object.keys(userData).length) {
                user.setIsAuth(true);
                localStorage.setItem("gamehubtoken", userData.token);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const _onRegister = (evt) => {
        console.log('register')
    }

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={_onEmailChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={_onPasswordChange} />
            </Form.Group>
            {
                isLogin ?
                    <Button variant="primary" onClick={_onLogin}>
                        Login
                    </Button>
                    :
                    <Button variant="primary" onClick={_onRegister}>
                        Register
                    </Button>
            }
        </Form>
    );
});

export default Auth;