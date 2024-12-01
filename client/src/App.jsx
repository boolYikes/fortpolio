import Header from "./components/Header"
import NavBar from "./components/NavBar"
import Stacks from "./components/Body/Stacks"
import Intermission from "./components/Body/Intermission"
import Carousel from "./components/Body/Carousel"
import IconSection from "./components/Body/IconSection"

function App() {
  return (
    <>
      <NavBar />
      <Header />
      <Stacks />
      <Intermission />
      <Carousel />
      <IconSection />
    </>
  )
}

export default App
