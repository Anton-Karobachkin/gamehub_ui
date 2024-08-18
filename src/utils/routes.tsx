import Auth from '../pages/Auth';
import Race from '../pages/Race';
import Home from '../pages/Home';

import { HOME_ROUTE, RACE_ROUTE, AUTH_ROUTE } from './consts';

export const authRoutes = [
    { path: HOME_ROUTE, element: <Home /> },
    { path: RACE_ROUTE, element: <Race /> }
]

export const publicRoutes = [
    { path: AUTH_ROUTE, element: <Auth /> },
]