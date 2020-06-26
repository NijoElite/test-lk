import React from 'react';
import { cn } from '@bem-react/classname';

import './Input.scss';

const cnInput = cn('Input');
const inputFieldCn = cnInput('Field');
const inputCaptionCn = cnInput('Caption');
const inputHintCn = cnInput('Hint');

const Input = ({ caption = '', hint = '', view = 'default', className, ...props }) => {
  return (
    <label className={cnInput({ view }, [className])}>
      {Boolean(caption) && <span className={inputCaptionCn}>{caption}</span>}
      <input {...props} className={inputFieldCn}/>
      {Boolean(hint) && <span className={inputHintCn}>{hint}</span>}
    </label>
  );
};

export default Input;
