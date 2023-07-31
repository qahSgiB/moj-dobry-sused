import { Outlet } from 'react-router-dom';

import Topbar from '../Topbar/Topbar';

import './Template.css'



const Template = () => {
  return (
    <>
      <div className='template__topbar'>
        <Topbar home={ true }/>
      </div>
      <div className='template__content-1'>
        <div className='template__content-2'>
          <Outlet />
        </div>
      </div>
    </>
  )
}



export default Template;