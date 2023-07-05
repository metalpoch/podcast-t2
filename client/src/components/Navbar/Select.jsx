import { useContext } from "react";
import { SheetContext } from "../../context/SheetContext";

export default function Select() {
	const { setLanguage } = useContext(SheetContext);

	const langOptions = ["es", "en", "fr", "de"];

	const handleSelect = (event) => {
		setLanguage(event.target.value);
	};

	return (
		<select name="language" onChange={handleSelect} id="language">
			{langOptions.map((lang, index) => {
				return (
					<option key={index} value={lang}>
						{lang}
					</option>
				);
			})}
		</select>
	);
}
