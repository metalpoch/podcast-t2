import Style from "./BlackTransition.module.css";
import Loading from "./Loading";

export default function BlackTransition() {
  return (
    <div className={Style.shadow}>
      <Loading />
    </div>
  );
}
