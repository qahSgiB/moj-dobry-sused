import { useStaticTopbarButtons } from '../components/Template';

import './Home.css'



const Home = () => {
  useStaticTopbarButtons({ type: 'notifications' }, { type: 'profile' });

  return (
    <p>helo helo (home)</p>
  )
}



export default Home;