
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import CreateAccountPage from "./Pages/CreateAccountPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateAccountPage/>} />
        
        
      </Routes>
    </Router>
  );
}

export default App;
