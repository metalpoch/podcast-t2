import { useContext } from "react";
import Style from "./Logged.module.css";
import { SheetContext } from "../../context/SheetContext";

export default function Logged() {
  const { content } = useContext(SheetContext);

  return (
    <div className={Style.grouper}>
      <h3 className="title textGradient">{content.spotify.loggedHeading}</h3>
      <p>{content.spotify.loggedText}</p>
    </div>
  );
}
