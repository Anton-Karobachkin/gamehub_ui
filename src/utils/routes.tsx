import Auth from '../pages/Auth';
import Home from '../pages/Home';

import { HOME_ROUTE, AUTH_ROUTE } from './consts';

export const authRoutes = [
    { path: HOME_ROUTE, element: <Home /> },
]

export const publicRoutes = [
    { path: AUTH_ROUTE, element: <Auth /> },
]