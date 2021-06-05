import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { useEffect } from 'react';
import { useAuthCheck } from './hooks/auth';

function App() {
  const authCheck = useAuthCheck();
  useEffect(authCheck);

  return (
    <Router>
      <Navbar />
    </Router>
  );
}

export default App;
