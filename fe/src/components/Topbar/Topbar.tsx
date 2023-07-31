import { Link } from 'react-router-dom'
import './Topbar.css'



type TopbarProps = {
  home: boolean
}

const Topbar = (props: TopbarProps) => {
  return (
    <div className='topbar'>
      { props.home
        ? <Link to='/notifications'><img className='topbar__icon' src="/icons/notification.svg" alt="notifications icon" /></Link>
        : <img className='topbar__icon' src="/icons/back.svg" alt="back icon" />
        // : <Link to='...'><img className='topbar__icon' src="/icons/back.svg" alt="back icon" /></Link>
      }
      {/* <img src="/icons/logo.svg" alt="logo" /> */}
      <p className='topbar__logo'>Môj Dobrý Sused</p>
      <Link to='/profile'><img className='topbar__icon' src="/icons/user.svg" alt="user icon" /></Link>
    </div>
  )
}



export default Topbar;