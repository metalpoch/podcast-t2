/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { SheetContext } from "../../context/SheetContext";
import Loading from "../Loading";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Testimonial from "./Testimonial";

import Style from "./TestimonialSlider.module.css";

export default function TestimonialSlider() {
	const [index, setIndex] = useState(0);
	const [error, setError] = useState(null);
	const [testimonials, setTestimonials] = useState([]);
	const {
		language,
		podcasters: { data, loading },
		content,
	} = useContext(SheetContext);

	useEffect(() => {
		if (data && data.error) setError(data.error);
		if (data && !data.error) {
			const filteredData = data.filter(
				(client) => client.language === language
			);

			setTestimonials(
				filteredData.map((client, index) => ({
					id: index,
					name: client.name,
					picture: client.picture,
					title: client.reviewTitle,
					message: client.reviewMessage,
				}))
			);
		}
	}, [data, language]);

	const handlePrev = () => {
		setIndex(index === 0 ? testimonials.length - 3 : index - 1);
	};

	const handleNext = () => {
		setIndex((index + 1) % (testimonials.length - 2));
	};

	if (loading) return <Loading />;
	if (error) return <h1>{error}</h1>;

	return (
		<section className={Style.bgDark}>
			<div
				className={`container padding-y ${Style.flex}`}
				id="testimonials">
				<h2 className="title">{content.testimonials.title}</h2>
				<div className={Style.slider}>
					<button className={Style.sliderBtn} onClick={handlePrev}>
						<FaAngleLeft className={Style.arrow} />
					</button>
					{testimonials.slice(index, index + 3).map((testimonial) => (
						<Testimonial key={testimonial.id} {...testimonial} />
					))}
					<button className={Style.sliderBtn} onClick={handleNext}>
						<FaAngleRight className={Style.arrow} />
					</button>
				</div>
			</div>
		</section>
	);
}
