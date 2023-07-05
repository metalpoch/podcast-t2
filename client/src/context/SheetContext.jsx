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
  const [loadinglang, setLoadingLang] = useState(false);
  const [language, setLanguage] = useState("es");
  const [content, setContent] = useState(constants["es"]);
  const subs = useFetch({ url: URL_SUBS });
  const podcasters = useFetch({ url: URL_PODCASTERS });

  useEffect(() => {
    setLoadingLang(true);
    const timeoutLoadingId = setTimeout(() => {
      setLoadingLang(false);
    }, 1000);
    const timeoutContentId = setTimeout(() => {
      setContent(constants[language]);
    }, 200);

    return () => {
      clearTimeout(timeoutLoadingId);
      clearTimeout(timeoutContentId);
    };
  }, [language]);

  return (
    <SheetContext.Provider
      value={{
        language,
        loadinglang,
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
