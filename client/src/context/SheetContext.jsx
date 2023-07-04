/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import useFetch from "../hooks/useFetch";

const URL_SUBS = import.meta.env.VITE_DATA_SUBCRIPTORS_URL;
const URL_PODCASTERS = import.meta.env.VITE_DATA_CLIENTS_URL;

const SheetContext = createContext();

const SheetContextProvider = (props) => {
  const [language, setLanguage] = useState("es")
  const subs = useFetch({ url: URL_SUBS });
  const podcasters = useFetch({ url: URL_PODCASTERS });

  return (
    <SheetContext.Provider value={{ 
      language, setLanguage, subs, podcasters 
      }}>
      {props.children}
    </SheetContext.Provider>
  );
};

export { SheetContext, SheetContextProvider };
