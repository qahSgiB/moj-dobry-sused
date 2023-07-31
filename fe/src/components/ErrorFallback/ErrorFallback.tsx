import { useRouteError } from 'react-router-dom';

import ErrorBox from './ErrorBox';
import { KnownError } from '../../utils/knownError';



const ErrorFallback = () => {
  const error = useRouteError();

  if (error instanceof KnownError) {
    const data = error.data;

    if (data.from === 'fe') {
      return (<ErrorBox title='ERROR' message={ data.data.message } backOnRetry={ data.data.code === 'route-not-found' } />);
    } else if (data.from === 'be') {
      return (<ErrorBox title='BACKEND ERROR' />);
    }
  } else {
    return (<ErrorBox title='UNKNOWN ERROR' />);
  }
}



export default ErrorFallback;