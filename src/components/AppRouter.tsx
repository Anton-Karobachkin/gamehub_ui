import React, { useContext } from 'react';
import { Context } from '../main';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HOME_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { authRoutes, publicRoutes } from '../utils/routes';
import { observer } from 'mobx-react-lite';

const AppRouter = observer(() => {
    const { user } = useContext(Context);
    console.log(user.isAuth)
    return (
        <Routes>
            {
                user.isAuth && authRoutes.map(route => <Route key={route.path} element={route.element} path={route.path}></Route>)
            }
            {
                !user.isAuth && publicRoutes.map(route => <Route key={route.path} element={route.element} path={route.path}></Route>)
            }
            <Route path="*" element={<Navigate to={user.isAuth ? HOME_ROUTE : LOGIN_ROUTE} />} />
        </Routes>
    );
});

export default AppRouter;