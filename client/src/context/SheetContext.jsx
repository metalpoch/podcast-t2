/* eslint-disable react/prop-types */
import { createContext } from "react";
import useFetch from "../hooks/useFetch";

const URL_SUBS = import.meta.env.VITE_DATA_SUBCRIPTORS_URL;
const URL_PODCASTERS = import.meta.env.VITE_DATA_CLIENTS_URL;

const SheetContext = createContext();

const SheetContextProvider = (props) => {
  const subs = useFetch({ url: URL_SUBS });
  const podcasters = useFetch({ url: URL_PODCASTERS });

  return (
    <SheetContext.Provider value={{ subs, podcasters }}>
      {props.children}
    </SheetContext.Provider>
  );
};

export { SheetContext, SheetContextProvider };
