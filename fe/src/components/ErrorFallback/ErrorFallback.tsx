import { useRouteError } from 'react-router-dom';

import ErrorBox from './ErrorBox';
import { KnownError } from '../../utils/knownError';



const ErrorFallback = () => {
  const error = useRouteError();

  if (error instanceof KnownError) {
    const data = error.data;

    if (data.from === 'fe') {
      return (<ErrorBox title='ERROR' message={ data.data.message } />);
    } else if (data.from === 'be') {
      const error = data.data;

      if (error.status === 'error-fe') {
        return (<ErrorBox title='BACKEND ERROR' message={ `[${error.data.code}] ${error.data.message}` } />);
      } else if (error.status === 'error-validation') {
        return (<ErrorBox title='BACKEND ERROR' message='validation' />);
      } else {
        return (<ErrorBox title='BACKEND ERROR' message='unknown' />);
      }
    }
  } else {
    return (<ErrorBox title='UNKNOWN ERROR' />);
  }
}



export default ErrorFallback;