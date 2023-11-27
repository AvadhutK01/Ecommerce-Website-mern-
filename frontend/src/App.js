import './App.css';
import Home from './component/Home/Home.js';
import About from './component/layout/About/About.js';
import Footer from './component/layout/Footer/Footer.js';
import Header from './component/layout/Header/Header.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
