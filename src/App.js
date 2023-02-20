import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/home-page/HomePage';
import LinearRegression from './pages/linreg-page/LinearRegression';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/linreg" element={<LinearRegression/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
