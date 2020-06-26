import React from 'react';
import { Switch } from 'react-router-dom';
import Cabinet from './pages/Cabinet/Cabinet';
import Landing from './pages/Landing/Landing';
import { AuthProvider } from './contexts/auth';
import ProtectedRoute, { isLoggedIn } from './components/ProtectedRoute/ProtectedRoute';

import './App.scss';

const App = () => {
  return (
    <AuthProvider>
      <Switch>
        <ProtectedRoute path="/cabinet" component={Cabinet} fallback="/"/>
        <ProtectedRoute path="/" component={Landing} fallback="/cabinet" fallbackPredicate={isLoggedIn}/>
      </Switch>
    </AuthProvider>
  );
};

export default App;
