import './App.css';
import About from './component/layout/About/About.js';
import Footer from './component/layout/Footer/Footer.js';
import Header from './component/layout/Header/Header.js'
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />
      <About />
      <Footer />
    </Router>
  );
}

export default App;
