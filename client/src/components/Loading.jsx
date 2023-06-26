import Style from "./Loading.module.css";

export default function Loading() {
	return (
		<div className={Style.spinnerContainer}>
			<div className={Style.loadingSpinner}></div>
		</div>
	);
}
