import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../layouts/footer';
import ApiComponent, { filtrarProductosPorCategoria } from '../../components/Api';
import '../products/style.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import Cart from '../../components/cart/Cart'

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [expandido, setExpandido] = useState(null);
  const { category } = useParams();


  const alternarDescripcion = (idProducto) => {
    setExpandido(expandido === idProducto ? null : idProducto);
  };

  const nombresCategorias = {
    Shoes: "Electrónicos",
    Clothes: "Ropa",
    Miscellaneous: "Misceláneos",
  };

  const tituloCategoria = nombresCategorias[category] || category;

  
  const addToCart = (producto) => {
    // Obtiene el carrito actual desde localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Verifica si el producto ya está en el carrito
    const existingProductIndex = cart.findIndex((item) => item.id === producto.id);
  
    if (existingProductIndex !== -1) {
      // Si el producto ya existe, incrementa su cantidad
      cart[existingProductIndex].quantity += 1;
    } else {
      // Si el producto no existe, lo agrega con cantidad inicial de 1
      cart.push({ ...producto, quantity: 1 });
    }
  
    // Guarda el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    Swal.fire({
      title: '¡Producto añadido!',
      text: `${producto.title} ha sido añadido a tu carrito.`,
      icon: 'success',
      timer: 1000,
      confirmButtonText: 'Aceptar'
    });
  };
  

  useEffect(() => {
    const cargarProductos = async () => {
      const datos = await ApiComponent();
      const productosFiltrados = filtrarProductosPorCategoria(datos.products, category); // Usa datos.products
      setProductos(productosFiltrados);
    };
    cargarProductos();
  }, [category]);

  return (
    <>
      <div>
        <h2>{category ? `Productos de ${tituloCategoria}` : 'Todos los Productos'}</h2>
        <div className="column mt-5">
          {productos.map((producto) => (
            <div className="card d-flex" key={producto.id}>
              <img className="card-img-top img-prod" src={producto.images[0]} alt={producto.title} />
              <div className="card-body">
                <h2 className="card-title fs-4">{producto.title}</h2>
                <p className="card-text">
                  {expandido === producto.id ? producto.description : `${producto.description.slice(0, 100)}...`}
                  <a onClick={() => alternarDescripcion(producto.id)}>
                    {expandido === producto.id ? "Ver menos" : "Ver más"}
                  </a>
                </p>
                <p className='text-success h5 fw-bold'>{producto.price} USD</p>
                <button className="btn btn-dark mt-2" onClick={() => addToCart(producto)}>
                  Añadir al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Productos;