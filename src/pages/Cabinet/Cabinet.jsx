import React from 'react';
import Contacts from './Cabinet.components/Contacts/Contacts';
import { cn } from '@bem-react/classname';

const cnCabinet = cn('Cabinet');
const cabinetCn = cnCabinet();

const Cabinet = () => {
  return (
    <div className={cabinetCn}>
      <Contacts />
    </div>
  );
};

export default Cabinet;
