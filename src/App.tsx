import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './index.css'
import './styles/GlobalStyles.css'

import Login from "./pages/Login";
import Categories from "./pages/Categories";
import { Toaster } from "sonner";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </Router>

      <Toaster richColors/>
    </>
  )
}

export default App
