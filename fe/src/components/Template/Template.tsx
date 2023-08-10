import { useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';

import TopbarButtonsContext from './TopbarButtonsContext';
import Topbar from '../Topbar/Topbar';

import './Template.css'



export type TopbarButton = {
  type: 'back',
  to: string,
} | {
  type: 'home',
} | {
  type: 'notifications',
} | {
  type: 'profile',
} | {
  type: 'custom',
  icon: string,
  to: string,
  alt: string,
} | undefined;



const getTopbarButtonData = (button: TopbarButton) => {
  if (button === undefined) {
    return undefined;
  } else if (button.type === 'back') {
    return {
      icon: '/icons/back.svg',
      to: button.to,
      alt: 'go back icon',
    }
  } else if (button.type === 'home') {
    return undefined; // [todo]
  } else if (button.type === 'notifications') {
    return {
      icon: '/icons/notification.svg',
      to: '/notifications',
      alt: 'notifications icon',
    }
  } else if (button.type === 'profile') {
    return {
      icon: '/icons/user.svg',
      to: '/profile',
      alt: 'profile icon',
    }
  } else {
    return {
      icon: button.icon,
      to: button.to,
      alt: button.alt
    }
  }
}


const Template = () => {
  const [leftButton, setLeftButton] = useState<TopbarButton>(undefined);
  const [rightButton, setRightButton] = useState<TopbarButton>(undefined);

  const leftButtonData = useMemo(() => getTopbarButtonData(leftButton), [leftButton]);
  const rightButtonData = useMemo(() => getTopbarButtonData(rightButton), [rightButton]);

  return (
    <>
      <div className='template__topbar'>
        <Topbar left={ leftButtonData } right={ rightButtonData }/>
      </div>
      <TopbarButtonsContext.Provider value={ { left: setLeftButton, right: setRightButton } }>
        <div className='template__content-1'>
          <div className='template__content-2'>
            <Outlet />
          </div>
        </div>
      </TopbarButtonsContext.Provider>
    </>
  )
}



export default Template;