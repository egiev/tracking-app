import { useContext, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../store/auth.context';

const ProtectedRoute = ({ children, redirect = '/admin' }) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  console.log(authCtx);

  // useState(() => {
  //   if (authCtx.user) {
  //     const expirationDuraton =
  //       new Date(
  //         new Date(authCtx.user.expiration).getTime() + 60 * 60 * 12 * 1000
  //       ).getTime() - new Date().getTime();

  //     setTimeout(() => {
  //       authCtx.logout();
  //       navigate('/');
  //     }, expirationDuraton);
  //   }
  // }, [authCtx.user]);

  if (!authCtx.user) {
    return <Navigate to={redirect} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
