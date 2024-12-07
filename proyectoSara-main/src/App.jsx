import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar  from './assets/layouts/navbar';
import Home from './assets/pages/home/home';
import Productos from './assets/pages/products/products';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={< Home />} />
            <Route path="/products" element={<Productos />} />
            <Route path="/byCategory/:category" element={<Productos />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App