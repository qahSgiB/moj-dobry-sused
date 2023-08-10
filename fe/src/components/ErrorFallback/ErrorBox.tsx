import { useNavigate } from 'react-router'

import './ErrorBox.css'



type ErrorBoxProps = {
  title: string,
  message?: string,
}


const ErrorBox = (props: ErrorBoxProps) => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  }

  const goBack = () => {
    navigate(-1);
  }

  const reload = () => {
    navigate('.', { relative: 'path', replace: true });
  }

  return (
    <div className='error-box'>
      <div className='error-box__info'>
        <p className='error-box__title'>{ props.title }</p>
        { props.message !== undefined && <p className='error-box__message'>{ props.message }</p> }
      </div>
      <div className='error-box__controls'>
        <button className='error-box__button' onClick={ goBack }>Back</button>
        <button className='error-box__button' onClick={ goHome }>Home</button>
        <button className='error-box__button' onClick={ reload }>Reload</button>
      </div>
    </div>
  )
}



export default ErrorBox;