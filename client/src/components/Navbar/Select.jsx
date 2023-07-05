import { useContext } from "react";
import Style from "./Select.module.css";
import { SheetContext } from "../../context/SheetContext";

export default function Select() {
  const { setLanguage, languages } = useContext(SheetContext);

  const handleSelect = ({ target: { value } }) => setLanguage(value);

  return (
    <select name="language" onChange={handleSelect} className={Style.language}>
      {languages.map((lang) => {
        return (
          <option key={lang.iso} value={lang.iso}>
            {lang.flag}
          </option>
        );
      })}
    </select>
  );
}
