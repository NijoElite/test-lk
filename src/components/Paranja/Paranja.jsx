import React from 'react';
import { cn } from '@bem-react/classname';

import './Paranja.scss';

const cnParanja = cn('Paranja');

const Paranja = ({ active }) => {
  return <div className={cnParanja({ active })}/>;
};

export default Paranja;
