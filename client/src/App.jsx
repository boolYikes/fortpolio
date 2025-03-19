import { useEffect, useState } from 'react'
import Header from "./components/Header"
import NavBar from "./components/NavBar"
import Stacks from "./components/Body/Stacks"
import Intermission from "./components/Body/Intermission"
import Carousel from "./components/Body/Carousel"
import IconSection from "./components/Body/IconSection"
import Contact from "./components/Body/Contact"
import Footer from "./components/Footer"
// import Test from "./components/Test"
import profileService from "./services/info"

const App = () => {

  const [profile, setProfile] = useState({})
  
  useEffect(() => {
      profileService
        .getMaster()
        .then(info => 
            setProfile(info)
        )
        // .catch(err => console.error("Error: ", err))
  }, [])
  
  return (
    <>
      {/** Delete Test on prod */}
      {/* <Test /> */}
      <NavBar profile={profile}/> 
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
