import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import './css/main.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Puedes agregar más rutas aquí */}
      </Routes>
    </Router>
  );
};

export default App;