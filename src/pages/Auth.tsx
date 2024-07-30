import { useState, useContext, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { HOME_ROUTE, AUTH_ROUTE } from '../utils/consts';
import { Context } from '../main';
import { observer } from 'mobx-react-lite';
import API from '../api/API';

let Auth = observer(() => {

    const [isLogin, setIsLogin] = useState(true);

    const location = useLocation();
    const navigate = useNavigate();

    const { user } = useContext(Context);

    // if (user.isAuth) navigate(HOME_ROUTE);

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
        const response = new API().loginUser({ email, password });
        response.then(res => {
            if (res.statusCode === 0) {
                localStorage.setItem("gamehubtoken", res.token);
                user.setIsAuth(true);
            } else {
                console.log(res);
            }
        });
    }

    const _onRegister = (evt) => {
        const response = new API().registerUser({ email, password });
        response.then(res => {
            if (res.statusCode === 0) {
                localStorage.setItem("gamehubtoken", res.token);
                user.setIsAuth(true);
            } else {
                console.log(res);
            }
        });
    }

    const _onSwitch = (evt) => {
        setIsLogin(prev => !prev);
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
            <Button variant="primary" onClick={_onSwitch}>
                Switch
            </Button>
        </Form>
    );
});

export default Auth;