import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/home-page/HomePage';
import LinearRegression from './pages/linreg-page/LinearRegression';
import LogisticRegression from './pages/logreg-page/LogisticRegression';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/linreg" element={<LinearRegression/>}/>
        <Route path="/logreg" element={<LogisticRegression/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
