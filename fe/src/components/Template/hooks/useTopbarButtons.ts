import { useCallback, useContext, useEffect } from "react";

import TopbarButtonsContext from "../TopbarButtonsContext";
import { TopbarButton } from "../Template";



const useTopbarButtons = () => {
  const topbarButtons = useContext(TopbarButtonsContext);
  if (topbarButtons === undefined) {
    throw new Error('ajeje toto by sa nemalo stat (context chyba');
  }

  const { left: setLeftButton, right: setRightButton } = topbarButtons;

  useEffect(() => {
    return () => {
      setLeftButton(undefined);
      setRightButton(undefined);
    }
  }, [setLeftButton, setRightButton]);

  return useCallback((leftButton: TopbarButton, rightButton: TopbarButton) => {
    setLeftButton(leftButton);
    setRightButton(rightButton);
  }, [setLeftButton, setRightButton]);
}



export default useTopbarButtons;