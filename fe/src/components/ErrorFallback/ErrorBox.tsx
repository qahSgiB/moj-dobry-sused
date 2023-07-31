import { useNavigate } from 'react-router'

import './ErrorBox.css'



type ErrorBoxProps = {
  title: string,
  message?: string,
  backOnRetry?: boolean
}


const ErrorBox = (props: ErrorBoxProps) => {
  const backOnRetry = props.backOnRetry ?? false;

  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  }

  const retry = () => {
    if (backOnRetry) {
      navigate(-1);
    } else {
      navigate('.', { relative: 'path' });
    }
  }

  return (
    <div className='error-box'>
      <div className='error-box__info'>
        <p className='error-box__title'>{ props.title }</p>
        { props.message !== undefined && <p className='error-box__message'>{ props.message }</p> }
      </div>
      <div className='error-box__controls'>
        <button className='error-box__button' onClick={ goHome }>Home</button>
        <button className='error-box__button' onClick={ retry }>{ backOnRetry ? 'Back' : 'Retry' }</button>
      </div>
    </div>
  )
}



export default ErrorBox;