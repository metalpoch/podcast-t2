import { useContext } from "react";
import { SheetContext } from "./context/SheetContext";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero";
import Spotify from "./components/Spotify/Spotify";
import TestimonialSlider from "./components/Testimonials/TestimonialSlider";
import ApplyForm from "./components/ApplyForm/ApplyForm";
import Footer from "./components/Footer";
import BlackTransition from "./components/BlackTransition";

export default function App() {
  const { loadinglang } = useContext(SheetContext);
  return (
    <>
      {loadinglang && <BlackTransition />}
      <Navbar />
      <main>
        <Hero />
        <Spotify />
        <TestimonialSlider />
        <ApplyForm />
      </main>
      <Footer />
    </>
  );
}
