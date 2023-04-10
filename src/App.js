import logo from './logo.svg';
import './App.css';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import Pdfeditor from './Components/pdf/Pdfeditor';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/pdfeditor' element={<Pdfeditor/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
