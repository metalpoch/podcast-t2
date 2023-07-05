/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { constants } from "../utils/constants.js";

const URL_SUBS = import.meta.env.VITE_DATA_SUBCRIPTORS_URL;
const URL_PODCASTERS = import.meta.env.VITE_DATA_CLIENTS_URL;
const LANGS = [
  { iso: "es", name: "Español", flag: "🇪🇸" },
  { iso: "en", name: "English", flag: "🇬🇧" },
  { iso: "de", name: "Deutsch", flag: "🇩🇪" },
  { iso: "fr", name: "Français", flag: "🇫🇷" },
];

const SheetContext = createContext();

const SheetContextProvider = (props) => {
  const [language, setLanguage] = useState("es");
  const [content, setContent] = useState(constants["es"]);
  const subs = useFetch({ url: URL_SUBS });
  const podcasters = useFetch({ url: URL_PODCASTERS });

  useEffect(() => {
    setContent(constants[language]);
  }, [language]);

  return (
    <SheetContext.Provider
      value={{
        language,
        setLanguage,
        subs,
        podcasters,
        content,
        languages: LANGS,
      }}
    >
      {props.children}
    </SheetContext.Provider>
  );
};

export { SheetContext, SheetContextProvider };
