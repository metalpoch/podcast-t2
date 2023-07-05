/* eslint-disable react/prop-types */
import Style from "./TestimonialSlider.module.css";

export default function Testimonial({ name, picture, title, message }) {
  return (
    <div className={Style.stretch}>
      <div className={Style.mask}>
        <img className={Style.image} src={picture} />
      </div>
      <div className={`card ${Style.testimonial} ${Style.flex}`}>
        <div>
          <h3 className="title">{name}</h3>
          <p className={`textGradient ${Style.title}`}>{title}</p>
        </div>
        <p>{message}</p>
      </div>
    </div>
  );
}
