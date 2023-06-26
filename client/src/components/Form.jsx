import Style from "./Form.module.css";
import Micro from "../assets/microphone.png";
import { useState } from "react";
// import useFetch from "../hooks/useFetch";
const URL = import.meta.env.VITE_DATA_CLIENTS_URL;

const LANGS = [
	{ iso: "es", name: "Español" },
	{ iso: "en", name: "English" },
	{ iso: "de", name: "Deutsch" },
	{ iso: "fr", name: "Français" },
	{ iso: "it", name: "Italiano" },
	{ iso: "pt", name: "Português" },
	{ iso: "ja", name: "日本語" },
];

export default function Form() {
	const [body, setBody] = useState({});

	const handler = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});

			const res = await response.json();
			console.log(res);
		} catch (error) {
			console.log(error);
		}
		e.target.reset();
	};

	return (
		<section className={`container padding-y ${Style.flex}`} id="solicitar">
			<div className={Style.colLeft}>
				<img className={`${Style.image} ${Style.mask} `} src={Micro} />
			</div>
			<form className={Style.colRight} onSubmit={handler}>
				<h3 className="title">Solicita nuestro servicio</h3>

				<div className={Style.inputsContainer}>
					<div className={Style.formControl}>
						<label htmlFor="client">Nombre y Apellido</label>
						<input
							id="client"
							name="client"
							type="text"
							onChange={({ target }) =>
								setBody({ ...body, client: target.value })
							}
						/>
					</div>

					<div className={Style.formControl}>
						<label htmlFor="email">Correo Electrónico</label>
						<input
							id="email"
							name="email"
							type="email"
							onChange={({ target }) =>
								setBody({ ...body, email: target.value })
							}
						/>
					</div>

					<div className={Style.row}>
						<div className={Style.formControl}>
							<label htmlFor="appointment">Fecha</label>
							<input
								id="appointment"
								name="appointment"
								type="date"
								onChange={({ target }) =>
									setBody({
										...body,
										appointment: target.value,
									})
								}
							/>
						</div>

						<div className={Style.formControl}>
							<label htmlFor="language">Idioma</label>
							<select
								id="language"
								name="language"
								onChange={({ target }) =>
									setBody({ ...body, language: target.value })
								}>
								{LANGS.map((lang, idx) => (
									<option key={idx} value={lang.iso}>
										{lang.name}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>
				<input type="submit" value="Solicitar" className={Style.btn} />
			</form>
		</section>
	);
}
