import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { useState } from 'react'

import './index.css'
import './styles/GlobalStyles.css'

import { Login } from "./pages/Login";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
