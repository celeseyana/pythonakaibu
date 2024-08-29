import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './MainThing.css';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Map1 from './Map1';
// import Map2 from './Map2';

export default function MainPage() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/map1' element={<Map1 />}></Route>
        {/* <Route path='/map2' element={<Map2 />}></Route> */}
      </Routes>
    </BrowserRouter>
  )
}
