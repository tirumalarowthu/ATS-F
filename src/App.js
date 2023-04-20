import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Homepage from './components/Homepage';
import { useState } from 'react';
import UpdateApplicant from './components/Updates/UpdateApplicant';
import AddApplicant from './components/ApplicantComponents/AddApplicant';
import FullDetails from './components/ApplicantComponents/FullDetails';
import Header from './components/Header';
import Footer from './components/Footer';
import UpdateOneApp from './components/Updates/UpdateOneApp';
import Forgot from './components/Forgot';

function App() {
  const [isLogin,setIsLogin]=useState(localStorage.getItem("AdminInfo"))
  return (
    <div >
     {isLogin?<BrowserRouter>
         <Header/>
        <Routes>
          <Route path="/" element={<Homepage />} ></Route>
          <Route path="/addApplicant" element={<AddApplicant/>}></Route>
          <Route path="/updateApplicant" element={<UpdateApplicant/>}></Route>
          <Route path="/update/one"element={<UpdateOneApp/>} ></Route>
          <Route path="/fullview" element={<FullDetails/>}></Route>
        </Routes>
      </BrowserRouter> : <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login setIsLogin={setIsLogin} />}></Route>
            <Route path='/forgot' element={<Forgot />}></Route>
        </Routes>
      </BrowserRouter>}
      
    </div>
  );
}

export default App;
