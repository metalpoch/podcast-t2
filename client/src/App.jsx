import { SheetContextProvider } from "./context/SheetContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Spotify from "./components/Spotify/Spotify";
import Testimonial from "./components/Testimonial";
import Form from "./components/Form";

export default function App() {
  return (
    <>
      <Navbar />
      <SheetContextProvider>
        <Hero />
        <Spotify />
        <Testimonial />
        <Form />
      </SheetContextProvider>
    </>
  );
}
