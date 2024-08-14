import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './MainThing.css';
import Home from './Home';
import Login from './Login';
import Registration from './Registration';

export default function MainPage() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/registration' element={<Registration />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
