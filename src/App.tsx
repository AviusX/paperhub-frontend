import { Switch, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Landing from './screens/Landing/Landing';
import { useEffect } from 'react';
import { useAuthCheck } from './hooks/auth';

function App() {
  const location = useLocation();
  const authCheck = useAuthCheck();
  useEffect(authCheck);

  return (
    <>
      {/* Render the navbar on all pages except the landing page. */}
      {location.pathname !== '/' ? (
        <Navbar />
      ) : null}
      <Switch>
        <Route path="/" exact>
          <Landing />
        </Route>
      </Switch>
    </>
  );
}

export default App;
