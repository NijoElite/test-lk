import React, { useCallback, useContext } from 'react';
import { authContext } from '../../../../contexts/auth';
import { cn } from '@bem-react/classname';

import './LoginForm.scss';
import { useForm } from '../../../../hooks/useForm';
import Form from '../../../../components/Form/Form';

const cnLoginForm = cn('LoginForm');
const loginFormCn = cnLoginForm();

const LoginForm = () => {
  const auth = useContext(authContext);
  const onSuccessSubmit = useCallback(async (e, { email, password }) => {
    e.preventDefault();

    const authData = await auth.login({ email, password });

    if (authData.error) {
      alert(authData.error.message);
    }
  }, [auth]);

  const onErrorSubmit = useCallback((e, values, errors) => {
    e.preventDefault();

    const message = Object.values(errors).join('\n');
    alert(message);
  }, []);

  const validate = useCallback(values => {
    const errors = {};
    const emailRegExp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (!values['email'].match(emailRegExp)) {
      errors['email'] = 'Вы ввели некорректный email';
    }

    if (values['password'].length < 3) {
      errors['password'] = 'Пароль слишком короткий';
    }

    return errors;
  }, []);

  const { values, onChange, onFormSubmit } = useForm({
    onSuccess: onSuccessSubmit,
    onError: onErrorSubmit,
    validate: validate,
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Form onSubmit={onFormSubmit} className={loginFormCn}>
      <Form.Input
        caption="Email"
        name="email"
        type="text"
        onChange={onChange}
        value={values['email']}
      />
      <Form.Input
        caption="Пароль"
        name="password"
        type="password"
        onChange={onChange}
        value={values['password']}
      />
      <Form.Submit>Войти</Form.Submit>
    </Form>
  );
};

export default LoginForm;
