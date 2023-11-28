import './App.css';
import Home from './component/Home/Home.js';
import ProductDetails from './component/Product/ProductDetails.js';
<<<<<<< HEAD
import Products from './component/Product/Products.js';
=======
>>>>>>> 1ae047d3a1a03fa531d45b2b14fdb1f6fecd8654
import About from './component/layout/About/About.js';
import Footer from './component/layout/Footer/Footer.js';
import Header from './component/layout/Header/Header.js';
import NotFound from "./component/layout/Not Found/NotFound";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route exact path="/product/:id" element={<ProductDetails />} />
<<<<<<< HEAD
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" clement={<Products />} />
=======
>>>>>>> 1ae047d3a1a03fa531d45b2b14fdb1f6fecd8654
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
