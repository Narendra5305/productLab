import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MapComponent from './pages/mapPage'


import { SigninPage } from './pages/signinPage'
import { SignupPage } from './pages/signupPage'
import PrivateRoute from './components/privateRoute'


import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";



function App() {
  

  return (
    
    
    <Router>
        <Routes>
          <Route path='/' element={ <PrivateRoute> { <MapComponent  />} </PrivateRoute>}/>
          <Route path='/signin' element={<SigninPage  />}/>
          <Route path='/signup' element={<SignupPage  />}/>
        </Routes>
    </Router>
  )
}

export default App
