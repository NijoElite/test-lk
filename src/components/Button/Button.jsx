import React from 'react';
import { cn } from '@bem-react/classname';

import './Button.scss';

const cnButton = cn('Button');

const Button = ({ children, className, size, width, ...props }) => {
  const mods = {
    width: width || '',
    size: size || 'm',
  };

  return (
    <button {...props} className={cnButton(mods, [className])}>
      {children}
    </button>
  );
};

export default Button;
