import Auth from '../pages/Auth';
import Home from '../pages/Home';

import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from './consts';

export const authRoutes = [
    { path: HOME_ROUTE, element: <Home /> },
]

export const publicRoutes = [
    { path: LOGIN_ROUTE, element: <Auth /> },
    { path: REGISTRATION_ROUTE, element: <Auth /> },
]