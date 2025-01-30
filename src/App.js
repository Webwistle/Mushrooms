
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import CreateAccountPage from "./Pages/CreateAccountPage";
import Home from './Pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<CreateAccountPage/>} />
        <Route path="/" element={<Home/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
