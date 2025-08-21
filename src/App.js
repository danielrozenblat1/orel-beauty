import logo from './logo.svg';
import './App.css';
import FirstScreen from './screens/NewFirstScreen';
import SecondScreen from './screens/SecondScreen';
import Works from './components/recommends/Works';
import FormScreen from './components/formScreen/FormScreen';
import CoursesDrawer from './components/Sillabuses/Sillabuses';
import AboutMe from './components/me/Me';
import ByMe from './components/ByMe/ByMe';
import ForthScreen from './screens/ForthScreen';
import OrelWorks from './components/recommends/OrelWorks';
import ThirdScreen from './screens/ThirdScreen';
import FifthScreen from './screens/FifthScreen';
import NavBarNew from './components/CourseNav/NavBarNew';

function App() {
  return <>
  {/* <FirstScreen/> */}
  <NavBarNew/>
  <FirstScreen/>
  <SecondScreen/>
  <AboutMe/>
  <OrelWorks/>
    <Works/>
    <FifthScreen/>

    <ThirdScreen/>

    <ForthScreen/>
<ByMe/>


  </>
}

export default App;
