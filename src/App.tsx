import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import "./styles/GlobalStyles.css";

import Login from "./pages/Login";
import Categories from "./pages/Categories";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/categories" element={<Categories />} />
          </Routes>
        </Router>
      </QueryClientProvider>

      <Toaster richColors />
    </>
  );
}

export default App;
