import Header from "./components/Header"
import NavBar from "./components/NavBar"
import Stacks from "./components/Body/Stacks"
import Intermission from "./components/Body/Intermission"
import Carousel from "./components/Body/Carousel"
import IconSection from "./components/Body/IconSection"
import Contact from "./components/Body/Contact"
import Footer from "./components/Footer"

function App() {
  return (
    <>
      <NavBar />
      <Header />
      <Stacks />
      <Intermission />
      <Carousel />
      <IconSection />
      <Contact />
      <Footer />
    </>
  )
}

export default App
