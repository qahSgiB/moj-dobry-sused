import { useEffect, useMemo, useState } from 'react';

import './Loading.css'



type LoadingProps = {
  ticksCount?: number,
  updateTime?: number,
  expand?: boolean,
}

const Loading = (props: LoadingProps) => {
  const ticksCount = useMemo(() => props.ticksCount ?? 8, [props.ticksCount]);
  const updateTime = useMemo(() => props.updateTime ?? 150, [props.updateTime]);

  const [animationState, setAnimationState] = useState({
    pos: 0,
    goRight: true,
  });

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setAnimationState(loadingState => {
        // [note] !== used as XOR, when left side of !== operator is true, goRight is negated
        const goRight = ((loadingState.goRight && loadingState.pos === ticksCount - 1) || (!loadingState.goRight && loadingState.pos === 0)) !== loadingState.goRight;

        return {
          goRight,
          pos: loadingState.pos + (goRight ? 1 : -1),
        };
      });
    }, updateTime);

    return () => { clearInterval(updateInterval); }
  }, [ticksCount, updateTime]);

  const text = '. '.repeat(animationState.pos) + 'loading' + ' .'.repeat(ticksCount - 1 - animationState.pos);

  return (
    <div className={ `loading-box${ (props.expand ?? true) ? ' loading-box--expanded' : '' }` }>
      <p className='loading-box__text'>{ text }</p>
    </div>
  )
}



export default Loading;