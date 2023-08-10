import React, { createContext } from "react";

import { TopbarButton } from "./Template";



type TopbarButtonsContextType = {
  left: React.Dispatch<React.SetStateAction<TopbarButton>>,
  right: React.Dispatch<React.SetStateAction<TopbarButton>>,
}

const TopbarButtonsContext = createContext<TopbarButtonsContextType | undefined>(undefined);



export default TopbarButtonsContext;