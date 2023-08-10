import { useContext, useEffect, useRef } from "react";

import TopbarButtonsContext from "../TopbarButtonsContext";
import { TopbarButton } from "../Template";



const useStaticTopbarButtons = (leftButton: TopbarButton, rightButton: TopbarButton) => {
  // [todo] zisit ci sa tu neda pouzit nieco lepsie
  // [note] constant ref (dava zmysel ??)
  const leftButtonRef = useRef(leftButton);
  const rightButtonRef = useRef(rightButton);

  const topbarButtons = useContext(TopbarButtonsContext);
  if (topbarButtons === undefined) {
    throw new Error('ajeje toto by sa nemalo stat (context chyba');
  }

  const { left: setLeftButton, right: setRightButton } = topbarButtons;

  useEffect(() => {
    // [note] using ref during rendering, but value of ref is never changed so it doesn't cause any impurities
    setLeftButton(leftButtonRef.current);
    setRightButton(rightButtonRef.current);

    return () => {
      setLeftButton(undefined);
      setRightButton(undefined);
    }
  }, [setLeftButton, setRightButton]);
}



export default useStaticTopbarButtons;