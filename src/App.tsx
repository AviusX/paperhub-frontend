import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Landing from './screens/Landing/Landing';
import Browse from './screens/Browse/Browse';
import Upload from './screens/Upload/Upload';
import { useAuthCheck } from './hooks/auth';
import IStore from './store/IStore';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, Flip } from 'react-toastify';
import './scss/ReactToastify.scss';
import { PermissionLevel } from './enums/PermissionLevel';

function App() {
  const location = useLocation();
  const authCheck = useAuthCheck();
  const permissionLevel = useSelector<IStore>(state => state.user.permissionLevel) as number;
  const isAuthenticated = useSelector<IStore>(state => state.user.isAuthenticated) as boolean;

  // We only want to run this useEffect once, not on every render.
  // Therefore, an empty array is necessary. Putting authCheck in the
  // dependency array will run this everytime since useAuthCheck will
  // return a new instance of authCheck function every time. This would
  // send a new request to /auth/check on every render.
  // So, disabling the warning about not including authCheck in the
  // dependency array here is a good idea.

  // eslint-disable-next-line
  useEffect(authCheck, []);

  return (
    <>
      {/* Render the navbar on all pages except the landing page. */}
      {location.pathname !== '/' ? (
        <Navbar />
      ) : null}

      {/* Render the toast container on every page so that toasts
      can show up anywhere. */}
      <ToastContainer transition={Flip} />

      <Switch>

        <Route path="/" exact >
          {isAuthenticated ? (
            <Redirect to="/browse" />
          ) : (
            <Landing />
          )
          }
        </Route>

        <Route path="/browse">
          <Browse />
        </Route>

        {isAuthenticated && permissionLevel >= PermissionLevel.Moderator ? (
          <Route path="/upload">
            <Upload />
          </Route>
        ) : (
          <Redirect to="browse" />
        )}
      </Switch>
    </>
  );
}

export default App;
