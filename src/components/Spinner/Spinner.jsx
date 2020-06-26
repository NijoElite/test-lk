import React from 'react';
import { cn } from '@bem-react/classname';

import './Spinner.scss';

const cnSpinner = cn('Spinner');

const Spinner = ({ active, center, className, fullscreen }) => {
  return <div className={cnSpinner({ active, center, fullscreen }, [className])}></div>;
};

export default Spinner;
