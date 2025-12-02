import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import "./styles/GlobalStyles.css";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Categories from "./pages/Categories";
import Transactions from "./pages/Transactions";
import Home from "./pages/Home";

import { Toaster } from "sonner";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/transactions" element={<Transactions />} />
          </Routes>
        </Router>
      </QueryClientProvider>

      <Toaster richColors />
    </>
  );
}

export default App;
