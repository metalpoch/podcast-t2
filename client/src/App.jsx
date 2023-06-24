import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Spotify from "./components/Spotify/Spotify";
import Podcast from "./components/Podcast";
import Testimonial from "./components/Testimonial";
import Form from "./components/Form";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Spotify />
      <Podcast />
      <Testimonial />
      <Form />
    </>
  );
}
