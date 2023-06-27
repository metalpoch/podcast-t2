import { SheetContextProvider } from "./context/SheetContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Spotify from "./components/Spotify/Spotify";
import TestimonialSlider from "./components/TestimonialSlider";
import ApplyForm from "./components/ApplyForm/ApplyForm";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <SheetContextProvider>
        <main>
          <Hero />
          <Spotify />
          <TestimonialSlider />
          <ApplyForm />
        </main>
      </SheetContextProvider>
      <Footer />
    </>
  );
}
