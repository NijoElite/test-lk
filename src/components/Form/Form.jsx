import React from 'react';
import Input from '../Input/Input';
import { cn } from '@bem-react/classname';
import Button from '../Button/Button';
import './Form.scss';

const cnForm = cn('Form');

const Form = ({ children, ...props }) => {
  const formProps = { ...props, className: cnForm({}, [props.className]) };
  if (props.onSubmit) {
    return <form {...formProps}>{children}</form>;
  }

  return <div {...formProps}>{children}</div>;
};

const FormInput = props => {
  return <Input {...props} className={cnForm('Input', [props.className])}/>;
};

const FormSubmit = ({ children, ...props }) => {
  return <Button {...props} width="max" className={cnForm('Submit', [props.className])} type="submit">{children}</Button>;
};

Form.Input = FormInput;
Form.Submit = FormSubmit;


export default Form;
