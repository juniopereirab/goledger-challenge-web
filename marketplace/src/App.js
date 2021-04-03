import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import NavBar from './components/Navbar';

function App() {
  return (
      <Router>
        <Routes/>
      </Router>
  );
}

export default App;
