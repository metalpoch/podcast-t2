/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { SheetContext } from "../context/SheetContext";
import Loading from "./Loading";
import Style from "./TestimonialSlider.module.css";

function Testimonial({ name, picture, title, message }) {
	return (
		<div className={`card ${Style.testimonial}`}>
			<div className={Style.mask}>
				<img className={Style.image} src={picture} />
			</div>
			<h3 className="title">{name}</h3>
			<p className="textGradient">{title}</p>
			<p>{message}</p>
		</div>
	);
}

export default function TestimonialSlider() {
	const [index, setIndex] = useState(0);
	const [testimonials, setTestimonials] = useState([]);
	const { podcasters } = useContext(SheetContext);

	useEffect(() => {
		if (podcasters.data)
			setTestimonials(
				podcasters.data.map((client, index) => ({
					id: index,
					name: client.name,
					picture: client.picture,
					title: client.reviewTitle,
					message: client.reviewMessage,
				}))
			);
	}, [podcasters]);

	const handlePrev = () => {
		setIndex(index === 0 ? testimonials.length - 3 : index - 1);
	};

	const handleNext = () => {
		setIndex((index + 1) % (testimonials.length - 2));
	};

	return (
		<div className={Style.bgDark}>
			<div className="container padding-y">
				<h2 className="title">Testimonials</h2>
				{podcasters.loading && <Loading />}
				<div className={Style.slider}>
					<button
						className={`${Style.sliderBtn} textGradient`}
						onClick={handlePrev}>
						&lt;
					</button>
					{testimonials.slice(index, index + 3).map((testimonial) => (
						<Testimonial key={testimonial.id} {...testimonial} />
					))}
					<button
						className={`${Style.sliderBtn} textGradient`}
						onClick={handleNext}>
						&gt;
					</button>
				</div>
			</div>
		</div>
	);
}
