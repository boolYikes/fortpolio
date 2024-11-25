import Header from "./components/Header"
import NavBar from "./components/NavBar"
import Stacks from "./components/Body/Stacks"
import Intermission from "./components/Body/Intermission"
import Slider from "./components/Body/Slider"
import IconSection from "./components/Body/IconSection"

function App() {
  return (
    <>
      <NavBar />
      <Header />
      <Stacks />
      <Intermission />
      <Slider />
      <IconSection />
    </>
  )
}

export default App
