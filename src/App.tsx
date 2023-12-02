import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/home"
import Paint from "./pages/paint/paint"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/paint" element={<Paint />} />
    </Routes>
  );
}

export default App;
