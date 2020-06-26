import React, { useContext, useCallback } from 'react';
import { authContext } from '../../contexts/auth';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import LoginForm from './Landing.components/LoginForm/LoginForm';
import { cn } from '@bem-react/classname';

const cnLanding = cn('Landing');

const landingCn = cnLanding();

const Landing = () => {
  const auth = useContext(authContext);
  const isLoggedIn = Boolean(auth.user);

  const onLogoutClick = useCallback(() => {
    auth.logout();
  }, [auth]);

  return (
    <div className={landingCn}>
      { isLoggedIn && <Link to="/cabinet">Контакты</Link> }
      {
        isLoggedIn ?
          <Button onClick={onLogoutClick}>Выйти</Button> :
          <LoginForm/>
      }
    </div>
  );
};

export default Landing;
