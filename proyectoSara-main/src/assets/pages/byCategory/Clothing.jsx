import React, { useState, useEffect } from 'react';
import Footer from '../../layouts/footer';
import ApiComponent from '../../components/Api';

const Clothing = async ()  => {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const loadProducts = async () => {
      const data = await ApiComponent();
      setProducts(data);
    };
    loadProducts();
  }, []);



  return (
    <div>
      <main>
        <h1>Ropa</h1>
        <div>
          <h2>Productos Disponibles</h2>
          <div>
            
          </div>
        
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Clothing;