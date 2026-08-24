import Seo from "../components/Seo";
import Hero from "../components/Hero";
import About from "../components/About";
import Gallery from "../components/Gallery";
import Hours from "../components/Hours";
import ReservationForm from "../components/ReservationForm";
import ContactForm from "../components/ContactForm";
import LocationMap from "../components/LocationMap";

export default function Home() {
  return (
    <>
      <Seo />
      <Hero />
      <About />
      <Gallery />
      <Hours />
      <ReservationForm />
      <ContactForm />
      <LocationMap />
    </>
  );
}
