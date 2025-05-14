import { useEffect, useState } from 'react';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Stacks from './components/Body/Stacks';
import Intermission from './components/Body/Intermission';
import Carousel from './components/Body/Carousel';
import IconSection from './components/Body/IconSection';
import Contact from './components/Body/Contact';
import Footer from './components/Footer';
// import Test from "./components/Test"
import profileService from './services/info';
import stackService from './services/stack';

const App = () => {
  const [profile, setProfile] = useState({});
  const [stack, setStack] = useState([]);

  useEffect(() => {
    profileService.getMaster().then((info) => setProfile(info));
    // .catch(err => console.error("Error: ", err))
    stackService.getStrong().then((stack) => setStack(stack));
  }, []);
  return (
    <>
      {/** Delete Test on prod */}
      {/* <Test /> */}
      <NavBar profile={profile} />
      <Header />
      <Stacks techStacks={stack} />
      <Intermission />
      <Carousel />
      <IconSection />
      <Contact />
      <Footer />
    </>
  );
};

export default App;
