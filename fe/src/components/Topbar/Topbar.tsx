import { Link } from 'react-router-dom'
import './Topbar.css'



type TopbarButton = {
  icon: string,
  to: string,
  alt: string,
}

type TopbarProps = {
  left?: TopbarButton,
  right?: TopbarButton,
}

const Topbar = (props: TopbarProps) => {
  return (
    <div className='topbar'>
      { props.left && <Link to={ props.left.to }><img className='topbar__icon topbar__icon-1' src={ props.left.icon } alt={ props.left.alt } /></Link> }
      <p className='topbar__logo'>Môj Dobrý Sused</p>
      { props.right && <Link to={ props.right.to }><img className='topbar__icon topbar__icon-2' src={ props.right.icon } alt={ props.right.alt } /></Link> }
    </div>
  )
}



export default Topbar;